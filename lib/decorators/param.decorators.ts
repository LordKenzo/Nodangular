const paramDecoratorFactory = (type: any) => {
  return (target: any, methodName: string | symbol, index: number) => {
    target.metaParams = target.metaParams || { params: []};
    //console.log(target.meta);
    /*
    Per ogni metodo mi costruisco la lista dei parametri: RES, REQ, NEXT, BODY, PARAMS...
    Questo mi serve per la apply/call che farò nell'handler del metodo che passo all'oggetto
    Router di Express!
    */
    if (target.metaParams.params[methodName] === undefined) {
      target.metaParams.params[methodName] = [];
    }
    target.metaParams.params[methodName].push({ index, type });
  };
}

const bodyDecoratorFactory = (type: string) => {
  return (name?: string) => {
    return (target: any, method: string | symbol, index: number) => {
      target.metaParams = target.metaParams || { params: []};
      if (target.metaParams.params[method] === undefined) {
        target.metaParams.params[method] = [];
      }
      target.metaParams.params[method].push({ index, type, name });
    }
  }
}


export const Req = paramDecoratorFactory('REQ');
export const Res = paramDecoratorFactory('RES');
export const Next = paramDecoratorFactory('NEXT');
export const Body = bodyDecoratorFactory('BODY');