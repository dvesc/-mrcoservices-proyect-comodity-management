import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import auth0_config from './configuration/auth0_config';
import mongo_config from './configuration/mongo_config';
import { CommoditiesModule } from './modules/commodities/commodities.module';
import { MongoConnectionModule } from './modules/mongo-connection/mongo-connection.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config(); //es la vieja importacion de js y eslind se pone sencible

@Module({
  imports: [
    CommoditiesModule,
    MongoConnectionModule,
    ConfigModule.forRoot({
      //Carga las diversas configuraciones
      load: [mongo_config, auth0_config],
      //carga las variables de acuerdo al entorno indicado
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true, //Activa las env para todos los modulos
    }),
  ],
})
export class AppModule {}
