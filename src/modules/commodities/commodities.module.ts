import { Module } from '@nestjs/common';
import { CommoditiesService } from './commodities.service';
import { CommoditiesController } from './commodities.controller';
import { MongoConnectionModule } from '../mongo-connection/mongo-connection.module';
import { MongoConnectionService } from '../mongo-connection/mongo-connection.service';
import { Commodity_vo, commodity_schema } from './entities/commodity.entity';

@Module({
  //importamos el modulo de mongo a este modulo
  imports: [MongoConnectionModule],
  controllers: [CommoditiesController],
  providers: [
    CommoditiesService,
    //Esto es raro, pero asi creamos nuestro modelo de la db e integramos mongoose a este modulo
    {
      //esto puede llamarse de otra forma, es como llamaremos la injeccion en el commodity_service
      provide: 'COMMODITY_MODEL',
      //Injectamos el servicio de mongo (ya configurado)
      inject: [MongoConnectionService],
      useFactory: (db: MongoConnectionService) =>
        db.get_connection().model<Commodity_vo>(
          'Commodity', //El nombre del modelo (vo)
          commodity_schema, //el schema
          'commodities', //la collection en la db
        ),
    },
  ],
})

//LE METEMOS LOS MIDDLEWARES (el de auth0)
export class CommoditiesModule {}
