import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
    ) {
    }
    async validateUser(account: string, password: string): Promise<any> {
        const user = await this.adminService.login(account, password);
        return user;
    }
}
