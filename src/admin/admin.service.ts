import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { AdminModel } from './admin.entity';
import { isEmail } from '../helper/functions';
interface ISessionInfo {
  adminId: number
  email: string
  phone: string
}
@Injectable()
export class AdminService {
  constructor(@Inject('ADMIN_REPOSITORY') private readonly adminRepository: typeof AdminModel) {}

  getList() {
    return this.adminRepository.findAll()
  }

  async add({account, password, nickname}): Promise<Partial<AdminModel>>{
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

  async getByEmail (email): Promise<AdminModel> {
    return this.adminRepository.findOne({where: {email}})
  }

  async getByPhone (phone): Promise<AdminModel>  {
    return  this.adminRepository.findOne({where: {phone}})
  }

  async getByAccount (account): Promise<AdminModel>  {
    if (account.includes('@')) {
      return this.getByEmail(account)
    }
    return this.getByPhone(account)
  }

  public static async isPasswordCorrect(admin: AdminModel, password): Promise<boolean> {
    return bcrypt.compare(password, admin.password)
  }

  async login(emailOrPhone: string, password: string) {
    const admin = await this.getByAccount(emailOrPhone)
    if (!admin) {
      return null
    }
    if (!await AdminService.isPasswordCorrect(admin, password)) {
      console.log({status: 200, message: 'wrong password', code: 10002, type: 'admin'})
      return null
    }
    return {
      id: admin.id,
      email: admin.email,
      phone: admin.phone,
    }
  }

  async generateSession(userId: number): Promise<ISessionInfo>
  async generateSession(user): Promise<ISessionInfo> {
    if (typeof user === 'number') {
      user = await this.adminRepository.findByPk(user)
    }
    return {
      adminId: user.id,
      phone: user.phone,
      email: user.email,
    }
  }
}
