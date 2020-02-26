import { Controller, Post, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import * as Multer from 'multer'
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from "path";
import { SessionGuard } from './auth/session-guard';

@Controller('/api')
export class AppController {
  @UseGuards(SessionGuard)
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 5,{
    limits:{
      fileSize: 1000*1000,
      files: 5
    },
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
    return files;
  }
}
