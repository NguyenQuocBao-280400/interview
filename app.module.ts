import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { PaymentModule } from './payment/payment.module';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [InvoiceItemModule, PaymentModule, ReceiptModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
