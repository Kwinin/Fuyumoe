import { Controller, Post, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import * as Multer from 'multer'
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from "path";
import { SessionGuard } from './auth/session-guard';

@Controller()
export class AppController {
  @UseGuards(SessionGuard)
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 10,{
    storage: Multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
      },
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
      },
    }),
  }))
  async upload(@UploadedFiles() files) {
    console.log(files)
    return files;
  }
}
