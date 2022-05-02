import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoConnectionService {
  private dbconection: Connection;

  //CONSTRUCTOR----------------------------------------------------------------
  constructor(
    //se hace una inyeccion (es como si crearamos una propiedad)
    private configservice: ConfigService,
  ) {
    //llamamos a la funcion para que se conecte a la db
    this.create_connection();
  }
  //---------------------------------------------------------------------------
  async create_connection() {
    const mongo_uri: string = this.configservice.get('mongo.uri');
    this.dbconection = await mongoose.createConnection(mongo_uri); //crea la coneccion
    //si la conexion es exitosa
    this.dbconection.once('open', () => {
      console.log('esto no funciona njs');
      console.log('Connected to mongo dbd');
    });
    //si la conexion no funcionas
    this.dbconection.once('error', () => {
      console.log('Error connecting to mongo db');
    });
  }
  //GETTER---------------------------------------------------------------------
  get_connection(): Connection {
    return this.dbconection;
  }
}
