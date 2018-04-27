function methodFactory(method: string, path: string){
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    console.log('Decoratore Method Invocato');

    target.meta = getMetaMethod(target);
    target.meta.routes[key] = {
      ...target.meta.routes[key],
      method,
      path
    }
    return descriptor;
  }
}

export function Get(path: string){
  return methodFactory('get', path);
}

function getMetaMethod(target: any) {
  if (!target.meta){
    return {
      routes: []
    }
  } else {
    return target.meta;
  }
}