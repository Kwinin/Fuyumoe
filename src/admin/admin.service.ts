import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { AdminModel } from './admin.entity';
import { isEmail } from '../helper/functions';
import * as config from 'config'
import { redis } from '../database/redis.db';
import { ApiException } from '../common/exceptions/api.exception';
import { ApiErrorCode } from '../common/enums/error_code';

interface ISessionInfo {
  id: number
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
      throw new ApiException('can not found this account', ApiErrorCode.USER_ID_INVALID, HttpStatus.BAD_REQUEST);
    }
    if (!await AdminService.isPasswordCorrect(admin, password)) {
      throw new ApiException('wrong password', ApiErrorCode.USER_PASS_INVALID, HttpStatus.BAD_REQUEST);
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
      id: user.id,
      phone: user.phone,
      email: user.email,
    }
  }

  async logout(sessionId) {
    const redisConfig = config.get('redis')
    const redisKey = `${redisConfig.prefix}${sessionId}`
    await redis.del(redisKey)
  }
}
