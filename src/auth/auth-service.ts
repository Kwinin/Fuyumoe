import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
    ) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.adminService.login(username, password);
        return user;
    }
}
