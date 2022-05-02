import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  uri: process.env.MONGO_URI,
}));

/**
 * es como crearle una propiedad al objeto configservice de nestjs"
 * la cual tendra la configuracion a modo de objeto tambien
 * ej:
 *
 * mongo: {
 *  uri: '',
 * }
 */
