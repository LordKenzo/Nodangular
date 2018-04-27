import 'reflect-metadata';
import { startServer } from '../core';

export function ControllerComponent(basePath: string){
  return <T extends { new (...args:any[]): {} }>(target: T) : T | void => {
    console.log('Decoratore Controller Invocato', target.prototype);
    const meta = getMetaClass(target.prototype);
    return class extends target {
      meta = {
        ...meta,
        basePath
      }
    }
  }
}

export function ServerComponent(opt: any) {
  return (target: any) => {
    const types = Reflect.getMetadata("design:paramtypes", target);
    const s = types.map((a:any) => a.name).join();
    console.log(`Costruttore param types: ${s}`);
    const metaDati = getMetaClass(target.prototype);
    target.prototype.meta = {
      ...metaDati,
      port: opt.port,
      initMsg: opt.initMsg,
      controllers: opt.controllers
    }
  }
}

export function NodeModule(opt: any) {
  return (target: any) => {
    const metaDati = getMetaClass(target.prototype);
    target.prototype.meta = {
      ...metaDati,
      bootstrap: opt.bootstrap
    }
    opt.bootstrap.map( (s:any) => startServer(s));
  }

}

function getMetaClass(target: any){
  if(!target.meta) {
    return {}
  } else {
    return target.meta;
  }
}