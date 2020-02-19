import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('list')
  getList(): string {
    return this.adminService.getList();
  }
  @Post('add')
  async add(@Body() data) {
    console.log(11, data)
    return this.adminService.add(data)
  }
}
