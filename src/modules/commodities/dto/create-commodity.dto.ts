import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommodityDto {
  @IsAlpha() //La string no puede tener numeros
  @IsNotEmpty() //No puede estar vacio
  name: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
