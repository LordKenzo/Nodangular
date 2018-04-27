import express, { Request, Application, Router } from 'express';

export const startServer = (Server: any) => {
  const app = express();
  const router = express.Router();
  const porta = (process.env.PORT || Server.prototype.meta.port);

  const handler = function(req: Request, res: any, next: any){
    res.send({message: `${Server.prototype.meta.initMsg}`});
  }

  router['get'].apply(router, ['/', handler]);

  app.use('/', router);

  app.listen(porta, () => {
  console.log(`${Server.prototype.meta.initMsg} (${porta})`);
  caricaController(app, Server.prototype.meta.controllers);

  // Codice da eliminare
  const server = new Server();
  server.main();
});

}

function caricaController(app: Application, controllers: any[]){
  (controllers || []).map(controller => applicaRoute(app, controller));
}

function applicaRoute(app: Application, controller: any){
  const instanceOfController = getController(controller);
  /*
  1. Per convenienza esplicito alcune costanti dei meta dati
  */
  const meta = instanceOfController.meta;
  const url = meta.basePath;
  const routes = meta.routes;
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
    const routeHandler = () => {
      const handler = instanceOfController[nomeMetodo].apply(instanceOfController);
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
  app.use(url, router);
}

function getController(controller: any){
  return new controller;
}
