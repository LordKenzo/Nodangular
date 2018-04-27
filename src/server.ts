import { UserController } from './controllers/user.controller';
import { ServerComponent } from '../lib';

@ServerComponent({
  port: 8080,
  initMsg: 'Server Alfa',
  controllers: [UserController]
})
export class Server {
  constructor(private userController: UserController) {}
  main(): void {
    console.log('Start Main');
  }
}

@ServerComponent({
  port: 3000,
  initMsg: 'Benvenuti nel Server Beta',
  controllers: [UserController]
})
export class Server2 {
  constructor(private userController: UserController) {}
  main(): void {
    console.log('Start Main');
  }
}