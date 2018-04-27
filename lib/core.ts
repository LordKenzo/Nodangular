import express, { Request } from 'express';

export const startServer = (Server: any) => {
  const app = express();
  const router = express.Router();
  const porta = (process.env.PORT || Server.prototype._metaClass.port);

  const handler = function(req: Request, res: any, next: any){
    res.send({message: `${Server.prototype._metaClass.initMsg}`});
  }

  router['get'].apply(router, ['/', handler]);

  app.use('/', router);

  app.listen(porta, () => {
  console.log(`${Server.prototype._metaClass.initMsg} (${porta})`);
  caricaController(app, Server.prototype._metaClass.controllers);

  // Codice da eliminare
  const server = new Server();
  server.main();
});

}

function caricaController(app: any, controllers: any[]){
  (controllers || []).map(controller => applicaRoute(app, controller));
}

function applicaRoute(app: any, controller: any){
  const instanceOfController = getController(controller);
  console.log('CONTROLLER', instanceOfController.meta);
}

function getController(controller: any){
  return new controller;
}
