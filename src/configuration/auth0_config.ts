import { registerAs } from '@nestjs/config';

export default registerAs('auth0', () => ({
  api_domain: process.env.AUTH0_DOMAIN,
}));

/**
 * es como crearle una propiedad al objeto configservice de nestjs"
 * la cual tendra la configuracion a modo de objeto tambien
 * ej:
 *
 * auth0: {
 *  api_domain: '',
 *  client_id: '',
 *  client_secret: '',
 *  connection_type: '',
 * }
 */
