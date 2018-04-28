export const methodFactory = (method: string, path: string) => {
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    // console.log('Decoratore Method Invocato');
    target.metaRoutes = target.metaRoutes || { routes: [] };
    target.metaRoutes.routes[key] = {
      ...target.metaRoutes[key],
      method,
      path
    }
    return descriptor;
  }
}

export const Get = (path: string = '') => {
  return methodFactory('get', path);
}

export const Post = (path: string = '') => {
  return methodFactory('post', path);
}
