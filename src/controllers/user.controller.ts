import { Controller, Get, Post, ControllerComponent, Res, Req, Next, Body } from '../../lib';
import { Request, Response, NextFunction } from 'express';

@ControllerComponent(
  '/Users'
)
export class UserController implements Controller {

  @Post()
  postUser(@Res res: Response, @Req req: Request, @Body('user') dati: any) {
    console.log('Send User by UserController');
    res.status(200).send({message: dati});
  }

  @Get()
  getUser(@Res res: Response, @Req req: Request) {
    console.log('Get User by UserController');
    res.status(200).send({message: 'Get User OK'});
  }

  @Get('/admin')
  getAdmin(@Res res: Response){
    console.log('Get Admin by UserController');
    res.status(200).send({message: 'Get Admin OK'});
  }
}
