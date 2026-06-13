import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';

@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @Post()
  create(@Body() createInvoiceItemDto: CreateInvoiceItemDto) {
    return this.invoiceItemService.create(createInvoiceItemDto);
  }
}
