import express, { Request, Application, Router , NextFunction} from 'express';
import * as bodyParser from 'body-parser';

export const startServer = (Server: any) => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  const router = express.Router();
  const porta = (process.env.PORT || Server.prototype.metaServer.port);

  const handler = function(req: Request, res: any, next: any){
    res.send({message: `${Server.prototype.metaServer.initMsg}`});
  }

  router['get'].apply(router, ['/', handler]);

  app.use('/', router);

  app.listen(porta, () => {
  console.log(`${Server.prototype.metaServer.initMsg} (${porta})`);
  caricaController(app, Server.prototype.metaServer.controllers);

  // Codice da eliminare
  const server = new Server();
  server.main();
});

}

function caricaController(app: Application, controllers: any[]){
  (controllers || []).map(controller => applicaRoute(app, controller));
}

function applicaRoute(app: Application, Controller: any){
  let controller = getController(Controller);
  // console.log('Controller', controller);
  console.log('Dati MetaController', controller.metaController);
  console.log('Dati MetaRoutes', controller.metaRoutes);

  const metaController = controller.metaController;
  const metaRoutes = controller.metaRoutes;
  const metaParams = controller.metaParams;
  const basePath = metaController.basePath;
  const routes = metaRoutes.routes;
  const params = metaParams.params;
  /*
  Curiosità: Per far si che la costante router abbia la firma dell'indice
  */
  const router: Router & {
    [key: string]: any;
  } = express.Router();
  /*
  2. Creo un ciclo for-of con Object.keys per prendere tutti i metodi dichiarati con un decoratore GET/POST/...
  */
  for (const nomeMetodo of Object.keys(routes)) {
    /*
    3. Creo un handler da applicare all'oggetto Router
    */
    const routeHandler = (req: Request, res: Response, next: NextFunction) => {
      const args = buildParams(req, res, next, params[nomeMetodo]);
      controller.metaInput.inputs.map( (input: string) => {
        controller[input] = buildInput(req, input);
      })

      const handler = controller[nomeMetodo].apply(controller, args);
      return handler;
    };
    /*
    4. Applico al mio router, il metodo, la path e l'handler
    */
    router[routes[nomeMetodo].method].apply(router, [routes[nomeMetodo].path, routeHandler])
  }
  /*
  5. Ecco a cosa ci serviva l'app di Express, in questo modo gli passiamo il nostro router per la basePath del Controller
  */
  app.use(basePath, router);
}

function getController(controller: any){
  return new controller();
}

const buildInput = (req: Request, input: string) => {
  return getParam(req, 'body', input);
}

const buildParams = (req: Request, res: Response, next: NextFunction, params: any[]): any[] => {

  const args: any[] = [];
  if (!params || !params.length) {
    return [req, res, next];
  }
  for (const { index, type, name } of params) {
    switch (type) {
      case 'REQ': args[index] = req; break;
      case 'RES': args[index] = res; break;
      case 'NEXT': args[index] = next; break;
      case 'BODY':
        args[index] = getParam(req, 'body', name);
        break;
    }
  }
  return args;
}

const getParam = (source: any, paramType: string | null, name: string | undefined): any => {
  const param = paramType ? source[paramType] : source;
  return name ? param[name] : param;
}
