import { HttpStatus } from '@nestjs/common';
import { My_exception } from './My_exception';

export class Nonexistent_commodity_exception extends My_exception {
  constructor() {
    super(
      'This commodity does not existid',
      'NonexistentCommodityException',
      HttpStatus.NOT_FOUND,
    );
  }
}
