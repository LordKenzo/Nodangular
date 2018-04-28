# Install and Start

```bash
npm install
npm start
```

Creo una classe User che implementa una interfaccia Controller.
Perchè utilizzare una interfaccia Controller? L'interfaccia ci permette di definire dei vincoli e avere quindi più certezza che il codice venga scritto in maniera più corretta.

# Cosa deve fare un Controller?

Il controller è una classe che gestisce degli Endpoint, delle Richieste, delle Response, ma anche una serie di parametri provenienti dalla Query String o dal Body della Richiesta.
Ha dei metodi.

# Meta Dati

Si suddividono in meta dati per il: Server (metaServer), per il Controller (metaController), per le Routes del controller (metaRoutes).

## Creazione dell'Handler

```ts
for (const nomeMetodo of Object.keys(routes)) {
  const routeHandler = () => {
    const handler = controller[nomeMetodo].apply(controller);
    return handler;
  };
  router[routes[nomeMetodo].method].apply(router, [routes[nomeMetodo].path, routeHandler])
}
```

Questo codice cicla per ogni metodo (decorato da un HTTP VERB) e costruisce l'handler dell'endpoint in base al metodo stesso, applicando gli argomenti che passiamo.
Di default potrei pensare che i miei metodi ricevano req, res, next e avere una classe Controller con le seguenti proprietà:

```ts
private req!: Request;
private res!: Response;
private next!: NextFunction
```

questo mi porta ad avere nella gestione dell'handler la costruzione dei 3 parametri req, res e next:

```ts
controller.req = req;
controller.res = res;
const handler = controller[nomeMetodo].apply(controller);
```

Oppure pensare di dichiararli nella funzione stessa:

```ts
getUser(req: Request, res: Response, next: NextFunction) {
```

ma una funzione riceverà anche altri argomenti. Come gestirli?
Prima di tutto scegliamo la soluzione che evidenzia per ogni metodo, quale argomento prendere tra req, res e next.

Dovrò costruire il mio handler così:

```ts
const handler = controller[nomeMetodo].apply(controller, [req, res, next]);
```

Ma quell'elenco di parametri che passo all'apply la devo costruire dinamicamente, prevedendo che un parametro potrei non passarlo o passarli in ordine diverso dal classico req, res e next.

A runtime ho una funzione che mi restituisce un array di argomenti, assegnando a ciasuno indice dell'array il corretto valore:

```ts
for (const { index, type } of params) {
    console.log(index, type)
    switch (type) {
      case 'REQ': args[index] = req; break;
      case 'RES': args[index] = res; break;
      case 'NEXT': args[index] = next; break;
    }
  }
```

Supponiamo di aver passato solo un oggetto @Res alla funzione del controller. Lo snip di codice è un ciclo for che prende un elenco di parametri del metodo decorato tramite destructuring costruisco le variabili index e type. Grazie ad una switch assegno REQ, RES e NEXT all'index i-esimo dell'array. Per cui se RES sarà il primo parametro, allora l'array nella 0-esima posizione avrà proprio un oggetto res.
Come costruisco il Decoratore dei Parametri?

```ts
export const paramDecoratorFactory = (type: any) => {
  return function (target: any, methodName: string | symbol, index: number) {
    target.metaParams = target.metaParams || { params: []};
    if (target.metaParams.params[methodName] === undefined) {
      target.metaParams.params[methodName] = [];
    }
    target.metaParams.params[methodName].push({ index, type });
  };
}

export const Req = paramDecoratorFactory('REQ');
export const Res = paramDecoratorFactory('RES');
export const Next = paramDecoratorFactory('NEXT');
```