import {
  Controller,
  Get,
  Post,
  ControllerComponent,
  Res,
  Req,
  Next,
  Body,
  Input
} from '../../lib';
import { Request, Response, NextFunction } from 'express';

interface User {
  firstName: string,
  lastName: string
}

@ControllerComponent(
  '/Users'
)
export class UserController implements Controller {

  @Input() user: User;
  @Input() password: string;

  @Post()
  postUser(@Res res: Response, @Req req: Request) {
    console.log('Utente letto dal body =>', this.user);
    console.log('password', this.password);
    console.log('Send User by UserController');
    res.status(200).send({'utente': this.user});
  }

  @Get()
  getUser(@Res res: Response, @Req req: Request) {
    console.log('Utente letto dal body =>', this.user);
    console.log('Get User by UserController');
    res.status(200).send({message: 'Get User OK'});
  }

  @Get('/admin')
  getAdmin(@Res res: Response){
    console.log('Get Admin by UserController');
    res.status(200).send({message: 'Get Admin OK'});
  }
}
