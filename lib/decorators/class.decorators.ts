import 'reflect-metadata';
import { startServer } from '../core';

export const  ControllerComponent = (basePath: string) => {
  return <T extends { new (...args:any[]): {} }>(target: T) : T | void => {
    // console.log('Decoratore Controller Invocato', target.prototype);
    target.prototype.metaController = target.prototype.metaController || {};
    return class extends target {
      metaController = {
        basePath
      }
    }
  }
}

export const ServerComponent = (opt: any) => {
  return (target: any) => {
    const types = Reflect.getMetadata("design:paramtypes", target);
    const s = types.map((a:any) => a.name).join();
    // console.log(`Costruttore param types: ${s}`);
    target.prototype.metaServer = target.prototype.metaServer || {};
    target.prototype.metaServer = {
      port: opt.port,
      initMsg: opt.initMsg,
      controllers: opt.controllers
    }
  }
}

export const NodAngular = (opt: any) => {
  return (target: any) => {
    target.prototype.metaServer = target.prototype.metaServer || {};
    target.prototype.metaServer = {
      bootstrap: opt.bootstrap
    }
    opt.bootstrap.map( (s:any) => startServer(s));
  }
}
