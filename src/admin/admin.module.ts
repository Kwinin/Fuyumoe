import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { DatabaseModule } from '../database/database.module';
import { AdminService } from './admin.service';
import { adminProviders } from './admin.provide';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    ...adminProviders,
  ],
  exports: [...adminProviders]})
export class AdminModule {}
