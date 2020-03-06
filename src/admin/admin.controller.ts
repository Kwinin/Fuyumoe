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
import { SessionGuard } from '../auth/session-guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('/admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/login')
  @ApiBody({
    schema: {
      required: ['account', 'password'],
      properties: {
        account: {type: 'string', description: '账户'},
        password: {type: 'string', description: '账户'},
      }
    }
  })
  async login(@Request() req): Promise<any> {
    const userInfo = await this.adminService.login(req.body.account, req.body.password);
    Object.assign(req.session, {admin: await this.adminService.generateSession(userInfo.id)})
    return userInfo
  }

  @UseGuards(SessionGuard)
  @Get('/list')
  getList() {
    return this.adminService.getList();
  }

  @UseGuards(SessionGuard)
  @Post('/add')
  async add(@Body() data) {
    return this.adminService.add(data)
  }

  @Get('/logout')
  async logout(@Request() req, @Res() res: Response) {
    if (req.session.admin) {
      await this.adminService.logout(req.session.id)
      //eslint-disable-next-line
      // @ts-ignore
      req.session.destroy()
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  }
}
