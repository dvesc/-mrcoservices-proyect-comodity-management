import { Inject, Injectable } from '@nestjs/common';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { Update_commodity_dto } from './dto/update-commodity.dto';
import { Commodity_vo } from './entities/commodity.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class CommoditiesService {
  //CONSTRUCTOR CON INYECCIONES------------------------------------------------
  constructor(
    //injectamos el modelo de la db que injectamos en el modulo
    @Inject('COMMODITY_MODEL')
    private model: Model<Commodity_vo>,
  ) {}

  //CREAR COMODITY--------------------------------------------------------------------
  async create(commodity_dto: CreateCommodityDto): Promise<Commodity_vo> {
    //convertirmos de dto a vo
    const commodity_vo = new this.model(commodity_dto);

    //guardamos en la db
    const new_commodity: Commodity_vo = await commodity_vo.save();
    return new_commodity;
  }

  //BUSCA COMMODITY POR TODO--------------------------------------------------------
  async coincidences_by_all(
    filtervalue: string,
    sort: object,
  ): Promise<Commodity_vo[]> {
    try {
      let coincidences: Commodity_vo[] = [];
      const reg_exp = new RegExp(`${filtervalue}`, 'i');

      //Creamos el filtro
      const terms: object[] = [{ name: reg_exp }, { user_id: filtervalue }],
        filter = { $and: [{ discharge_date: null }, { $or: terms }] };

      //Consultamos la db
      coincidences = await this.model.find(filter).sort(sort);
      return coincidences;
    } catch (err) {
      console.log('error: ' + err);
    }
  }

  //COINCIDENCIA POR NOMBRE----------------------------------------------------
  async coincidences_by_name(
    filtervalue: string,
    sort: object,
  ): Promise<Commodity_vo[]> {
    try {
      let coincidences: Commodity_vo[] = [];

      //Consultamos la db
      const reg_exp = new RegExp(`${filtervalue}`, 'i');
      coincidences = await this.model
        .find({
          name: reg_exp,
          discharge_date: null,
        })
        .sort(sort);

      return coincidences;
    } catch (error) {
      //MANEJAR ERROR
    }
  }
  //COINCIDENCIAS POR USER ID--------------------------------------------------
  async coincidences_by_user_id(
    filtervalue: string,
    sort: object,
  ): Promise<Commodity_vo[]> {
    try {
      let coincidences: Commodity_vo[] = [];
      //Consultamos la db
      coincidences = await this.model
        .find({
          user_id: filtervalue,
          discharge_date: null,
        })
        .sort(sort);

      return coincidences;
    } catch (err) {
      //MANEJAR ERROR
    }
  }

  //ENCUENTRA UNO POR USER ID------------------------------------------
  async find_by_user_id(user_id: string): Promise<Commodity_vo> {
    try {
      const coincidence: Commodity_vo = await this.model.findOne({
        user_id: user_id,
        discharge_date: null,
      });

      return coincidence;
    } catch (err) {
      //MANEJAR ERROR
    }
  }

  //ENCUENTRA UNO POR USER ID Y NOMBRE------------------------------------------
  async find_by_user_id_and_name(
    user_id: string,
    commodity_name: string,
  ): Promise<Commodity_vo> {
    try {
      const coincidence: Commodity_vo = await this.model.findOne({
        user_id: user_id,
        name: commodity_name,
        discharge_date: null,
      });

      return coincidence;
    } catch (err) {
      //MANEJAR ERROR
    }
  }

  //ENCUENTRA UNO POR EL COMMODITY_ID------------------------------------------
  //OJO-> aqui no le pongo que tipo de dato retorna para que me aparescan todos
  //los metodos (si no el "updateone()" no sale)
  async find_by_id(commodity_id: string) {
    try {
      const coincidence = await this.model.findOne({
        _id: new Types.ObjectId(commodity_id),
        discharge_date: null,
      });

      return coincidence;
    } catch (err) {
      console.log(err);
    }
  }

  //No pongo el tipo de dato que retorna porque no muestra todas las propiedades
  async update(id: string, updateCommodityDto: Update_commodity_dto) {
    //LLamamos a la commodity original y actualizamos
    const original_commodity = await this.find_by_id(id);

    await original_commodity.updateOne({
      name: updateCommodityDto.name,
    });

    return true;
  }

  async remove(id: string): Promise<boolean> {
    //LLamamos a la commodity original y actualizamos
    const original_commodity = await this.find_by_id(id);
    await original_commodity.updateOne({
      $set: {
        discharge_date: Date(),
      },
    });
    return true;
  }
}
