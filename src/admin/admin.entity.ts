import { Table, Column, Model } from 'sequelize-typescript';
import { INTEGER, ENUM } from 'sequelize';
export enum EnumEnableType {
  enable = 'ENABLE',
  disable = 'DISABLE',
  delete = 'DELETE'
}
@Table({
  tableName: 'admins',
  freezeTableName: true,
  timestamps: true,
})
export class AdminModel extends Model<AdminModel> {
  @Column({ type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true})
  id: number
  @Column
  name: string
  @Column
  nickname: string
  @Column
  email: string
  @Column
  phone: string
  @Column
  password: string
  @Column({
    type: ENUM(EnumEnableType.enable, EnumEnableType.disable, EnumEnableType.delete),
    defaultValue: EnumEnableType.enable,
  })
  enableType: string
}
