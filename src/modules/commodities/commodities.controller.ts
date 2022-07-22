import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { paginated_data } from 'src/common/pagination';
import { Auth0TokenGuard } from '../authorization/authorization.guard';
import { CommoditiesService } from './commodities.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { Update_commodity_dto } from './dto/update-commodity.dto';
import { Commodity_vo } from './entities/commodity.entity';
import { Commodity_duplication_exception } from '../../errors/Commodity_duplication_exception';
import { Nonexistent_commodity_exception } from '../../errors/Nonexistent_commodity_exception';
import { OwnCommoditiesGuard } from './own_commodities.guard';

//Serian las rutas
@Controller('commodities')
export class CommoditiesController {
  //Inyectamos el servicio
  constructor(private readonly commoditiesService: CommoditiesService) {}

  //CRUD-----------------------------------------------------------------------
  @UseGuards(Auth0TokenGuard)
  @Post()
  //Este sera el codigo de respuesta predeterminado
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() comodity_dto: CreateCommodityDto): Promise<any> {
    //Comprobamos que el usuario no repita una commodity
    const user_commodity: Commodity_vo =
      await this.commoditiesService.find_by_user_id_and_name(
        comodity_dto.user_id,
        comodity_dto.name,
      );
    //Si existe es porque ese usuario ya la tenia creada
    if (user_commodity) {
      throw new Commodity_duplication_exception();
    }

    //Creamos la commodity
    const commodity_created = await this.commoditiesService.create(
      comodity_dto,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'The commodity has been created succesfully',
      data: commodity_created,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findby(
    @Req()
    req: Request,
    @Query()
    query_params,
  ) {
    let coincidences = null;
    //Asignamos valores predeterminados
    const filter_by: string = query_params.filterby || 'all',
      filter_value: string = query_params.filtervalue || '',
      order: number = query_params.order == 'desc' ? -1 : 1,
      order_by: string = query_params.orderby || 'registration_date',
      page: number = query_params.page || 1,
      size: number = query_params.size || 10,
      //debe ser "<order by>:<1||-1>"
      sort: object = {
        [`${order_by || 'registration_date'}`]: order,
      };

    switch (filter_by) {
      case 'all':
        coincidences = await this.commoditiesService.coincidences_by_all(
          filter_value,
          sort,
        );
        break;
      case 'name':
        coincidences = await this.commoditiesService.coincidences_by_name(
          filter_value,
          sort,
        );
        break;
      case 'user_id':
        coincidences = await this.commoditiesService.coincidences_by_user_id(
          filter_value,
          sort,
        );
        break;
    }
    return paginated_data(page, size, coincidences, req);
  }

  @UseGuards(Auth0TokenGuard, OwnCommoditiesGuard)
  @Put(':commodity_id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() params,
    @Body() update_commodity_dto: Update_commodity_dto,
  ) {
    const commodity_id: string = params.commodity_id;
    //buscamos el commodity original
    const original_commodity: Commodity_vo =
      await this.commoditiesService.find_by_id(commodity_id);
    //Comprobamos que exista dicha commodity
    if (!original_commodity) throw new Nonexistent_commodity_exception();

    //actualizamos la commodity
    await this.commoditiesService.update(commodity_id, update_commodity_dto);

    return {
      status: HttpStatus.OK,
      message: 'The commodity has been updated succesfully',
    };
  }

  @UseGuards(Auth0TokenGuard, OwnCommoditiesGuard)
  @Delete(':commodity_id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param() params) {
    const commodity_id: string = params.commodity_id;
    //buscamos el commodity a eliminar
    const original_commodity: Commodity_vo =
      await this.commoditiesService.find_by_id(commodity_id);
    //Comprobamos que exista dicha commodity
    if (!original_commodity) throw new Nonexistent_commodity_exception();
    //VALIDAR QUE LA COMODITY PERTENESCA AL USUARIO

    //ELiminamos la commodity
    await this.commoditiesService.remove(commodity_id);

    return {
      status: HttpStatus.OK,
      message: 'The commodity has been deleted succesfully',
    };
  }
}
