import { Controller, Get, ControllerComponent } from '../../lib';

@ControllerComponent(
  '/Users'
)
export class UserController implements Controller {
  @Get('')
  getUser(){
    console.log('Get User by UserController');
  }

  @Get('/admin')
  getAdmin(){
    console.log('Get Admin by UserController');
  }
}