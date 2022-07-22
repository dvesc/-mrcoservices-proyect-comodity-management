import { HttpStatus } from '@nestjs/common';
import { My_exception } from './My_exception';

export class Foreign_commodity_exception extends My_exception {
  constructor() {
    super(
      'This commodity does not belong to you',
      'ForeignCommodityException',
      HttpStatus.CONFLICT,
    );
  }
}
