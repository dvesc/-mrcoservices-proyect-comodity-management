import { Schema, ObjectId } from 'mongoose';

export interface Commodity_vo {
  _id: ObjectId;
  user_id: string;
  name: string;
  registration_date?: Date;
  discharge_date?: Date;
}

export const commodity_schema = new Schema<Commodity_vo>({
  user_id: { type: String, required: true, default: null },
  name: { type: String, required: true },
  discharge_date: { type: Date, default: null },
  registration_date: { type: Date, required: true, default: new Date() },
});

//no crearemos el modelo aqui como en expressm sino en el modulo donde importamos esto
