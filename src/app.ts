import { NodeModule } from '../lib';
import { Server, Server2} from './server';

@NodeModule({
  bootstrap: [Server, Server2]
})
class App {}
