import { Table, Column, Model } from 'sequelize-typescript';
import { INTEGER, TEXT, BIGINT, ENUM } from 'sequelize';
export enum EnumEnableType {
  enable = 'ENABLE',
  disable = 'DISABLE',
  delete = 'DELETE'
}
@Table({
  tableName: 'articles',
  freezeTableName: true,
  timestamps: true,
})
export class Article extends Model<Article> {
  @Column({ type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true})
  id: number
  @Column
  adminId: number
  @Column
  title: string
  @Column({
    type: TEXT
  })
  content: string
  @Column
  categoryId: number
  @Column({
      type: BIGINT,
      allowNull: true,
  })
  isTop: number
  @Column({
    type: BIGINT,
    allowNull: true,
  })
  isDelicacy: number
  @Column({type: INTEGER, defaultValue: 1})
  clickNum: number
  @Column({
    type: ENUM(EnumEnableType.enable, EnumEnableType.disable, EnumEnableType.delete),
    defaultValue: EnumEnableType.enable,
  })
  enableType: string
}
