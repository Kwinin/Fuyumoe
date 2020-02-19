import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { Admin } from './admin.entity';
import { isEmail } from '../helper/functions';

@Injectable()
export class AdminService {
  constructor(@Inject('ADMIN_REPOSITORY') private readonly adminRepository: typeof Admin) {}

  getList(): string {
    return 'Hello GetAdmins!';
  }

  async add({account, password, nickname}): Promise<Partial<Admin>>{
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    const adminReg = await this.adminRepository.create({
      email: isEmail(account) ? account : null,
      phone: isEmail(account) ? null : account,
      password: hash,
      nickname
    })
    return adminReg
  }

}
