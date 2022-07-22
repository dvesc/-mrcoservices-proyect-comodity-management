import { IsAlpha, IsAscii, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommodityDto {
  @IsAscii()
  @IsNotEmpty() //No puede estar vacio
  name: string;

  @IsNotEmpty() //No puede estar vacio
  user_id: string;
}
