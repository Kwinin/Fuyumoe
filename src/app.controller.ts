import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import * as Multer from 'multer'
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from "path";

@Controller()
export class AppController {
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 10,{
    storage: Multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async uploade(@UploadedFiles() files) {
    console.log(files)
    return files;
  }
}
