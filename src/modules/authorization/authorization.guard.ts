import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { expressjwt: jwt } = require('express-jwt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwksRsa = require('jwks-rsa');

@Injectable()
export class Auth0TokenGuard implements CanActivate {
  private auth_domain = this.configservice.get('auth0.api_domain');

  //CONSTRUCTOR----------------------------------------------------------------
  constructor(private configservice: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0),
      res = context.getArgByIndex(1);
    const checkJwt = promisify(
      //Con esto verificamos tokens en general
      jwt({
        //secret se refiere a la firma secreta
        secret: jwksRsa.expressJwtSecret({
          //con eso la consultamos
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${this.auth_domain}/.well-known/jwks.json`,
        }),
        audience: `https://${this.auth_domain}/api/v2/`,
        issuer: `https://${this.auth_domain}/`,
        algorithms: ['RS256'],
      }),
    );
    //Verificamos que el token si haya sido emitido por auth0
    try {
      await checkJwt(req, res);
    } catch (error) {
      //error manejado por el errorhandler de nestjs
      throw new UnauthorizedException(error);
    }

    //Verificamos que el que emite el token es el mismo que lo usa
    console.log('el req:' + req);

    return true;
  }
}
