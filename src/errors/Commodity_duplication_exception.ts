import { HttpStatus } from '@nestjs/common';
import { My_exception } from './My_exception';

export class Commodity_duplication_exception extends My_exception {
  constructor() {
    super(
      'It looks like the user is trying to create a commodity they already own',
      'CommodityDuplicationException',
      HttpStatus.CONFLICT,
    );
  }
}
