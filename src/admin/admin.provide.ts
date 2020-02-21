import { AdminModel } from './admin.entity';

export const adminProviders = [
  {
    provide: 'ADMIN_REPOSITORY',
    useValue: AdminModel,
  },
];
