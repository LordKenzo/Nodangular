import 'reflect-metadata';
import { startServer } from '../core';

export function ServerComponent(opt: any) {
  return (target: any) => {
    const types = Reflect.getMetadata("design:paramtypes", target);
    const s = types.map((a:any) => a.name).join();
    console.log(`Costruttore param types: ${s}`);
    const metaDati = getMetaClass(target.prototype);
    target.prototype._metaClass = {
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
    target.prototype._metaClass = {
      ...metaDati,
      bootstrap: opt.bootstrap
    }
    opt.bootstrap.map( (s:any) => startServer(s));
  }

}

function getMetaClass(target: any){
  if(!target._metaClass) {
    return {}
  } else {
    return target._metaClass;
  }
}