import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CommoditiesService } from './commodities.service';
import { Foreign_commodity_exception } from 'src/errors/Foreign_comodity_exception';
import { Nonexistent_commodity_exception } from 'src/errors/Nonexistent_commodity_exception';
import { Commodity_vo } from './entities/commodity.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

@Injectable()
export class OwnCommoditiesGuard implements CanActivate {
  //CONSTRUCTOR----------------------------------------------------------------
  constructor(private commodity_services: CommoditiesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.getArgByIndex(0),
      token = req.headers.authorization.split(' ')[1],
      //decodificamos el token
      payload = jwt.decode(token, { complete: true }).payload,
      user_id = payload.sub; //de auth0

    //obtenemos el id de la comodity del req y la consultamos
    const coincidence: Commodity_vo = await this.commodity_services.find_by_id(
      req.params.commodity_id,
    );
    //Comprobamos que exista dicha commodity
    if (!coincidence) throw new Nonexistent_commodity_exception();
    //Comprobamos que esa comodity le pertenesca al mismo que emitio el token
    if (`auth0|${coincidence.user_id}` != user_id)
      throw new Foreign_commodity_exception();

    return true;
  }
}
