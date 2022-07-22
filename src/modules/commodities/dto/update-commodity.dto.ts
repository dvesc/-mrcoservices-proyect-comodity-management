import { PartialType } from '@nestjs/mapped-types';
import { IsAlpha, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { CreateCommodityDto } from './create-commodity.dto';

export class Update_commodity_dto extends PartialType(CreateCommodityDto) {
  @IsOptional()
  @IsAlpha()
  name?: string;

  @IsEmail()
  email: string;
}
