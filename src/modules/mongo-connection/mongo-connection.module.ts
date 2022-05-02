import { Module } from '@nestjs/common';
import { MongoConnectionService } from './mongo-connection.service';

@Module({
  //importamos y exportamos el servicio
  providers: [MongoConnectionService],
  exports: [MongoConnectionService],
})
export class MongoConnectionModule {}
