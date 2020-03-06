import { Table, Column, Model } from 'sequelize-typescript';
import { INTEGER, TEXT, BIGINT, ENUM } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({description:"文章Id"})
  @Column({ type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true})
  id: number

  @ApiProperty({description:"管理员Id"})
  @Column
  adminId: number

  @ApiProperty({description:"文章标题"})
  @Column
  title: string

  @ApiProperty({description:"文章缩略图"})
  @Column
  thumbnail: string

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

  @ApiProperty({description:"文章状态"})
  @Column({
    type: ENUM(EnumEnableType.enable, EnumEnableType.disable, EnumEnableType.delete),
    defaultValue: EnumEnableType.enable,
  })
  enableType: string
}
