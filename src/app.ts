import { NodAngular } from '../lib';
import { Server, Server2} from './server';

@NodAngular({
  bootstrap: [Server, Server2]
})
class App {}
