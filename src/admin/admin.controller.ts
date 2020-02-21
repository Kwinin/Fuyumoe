import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpCode,
  Param,
  UseGuards,
  Request,
  Res,
  Session,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/login')
  async login(@Request() req): Promise<any> {
    const userInfo = await this.adminService.login(req.body.account, req.body.password);
    console.log(343, userInfo, req.session)
    Object.assign(req.session, await this.adminService.generateSession(userInfo.id))
    return userInfo
  }

  @Get('/list')
  getList() {
    return this.adminService.getList();
  }
  @Post('/add')
  async add(@Body() data) {
    return this.adminService.add(data)
  }

  @Get('/checklogin')
  public checkLogin() {
    return "valid user:"
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
  }
}
