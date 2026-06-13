import { Injectable } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';

@Injectable()
export class InvoiceItemService {
  create(createInvoiceItemDto: CreateInvoiceItemDto) {
    return 'This action adds a new invoiceItem';
  }
}
