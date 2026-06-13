import {Test, TestingModule} from '@nestjs/testing';
import {PaymentService} from './payment.service';
import {PaymentMethod} from "../common/enums/payment-method.enum";
import {InvoiceStatus} from "../common/enums/invoice-status.enum";
import {PaymentStatus} from "../common/enums/payment-status.enum";

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  const inputInvoice = {
    id: '1',
    invoiceNumber: '001',
    invoiceDate: new Date(),
    items: [
      {
        description: "Monthly Fee",
        quantity: 2,
        unitPrice: 500.00
      }
    ],
    totalAmount: 1000.00,
    totalTax: 38.57,
    outstandingAmount: 1000.00,
    status: InvoiceStatus.Unpaid,
  }
  const inputPayment1 = {
    id: '1',
    invoiceId: '1',
    paymentMethod: PaymentMethod.Cash,
    amount: 300.00,
    paymentDate: new Date(),
    referenceNumber: '1',
    status: PaymentStatus.Unpaid,
  }
  const inputPayment2 = {
    id: '2',
    invoiceId: '1',
    paymentMethod: PaymentMethod.BankTransfer,
    amount: 750.00,
    paymentDate: new Date(),
    referenceNumber: '1',
    status: PaymentStatus.Unpaid,
  }

  it('should support multiple payment methods and overpayment', () => {
    const result1 = service.payment(inputInvoice, inputInvoice.outstandingAmount,inputPayment1);
    const newInputInvoice = {
      ...inputInvoice,
      outstandingAmount: result1.paymentAmount.outstanding
    }
    const result2 = service.payment(inputInvoice, newInputInvoice.outstandingAmount,inputPayment2);
    expect(result2.paymentAmount.outstanding).toBe(-50);
    expect(result2.updatePaymentMethod.status).toBe('OVER_DUE');
  });

  it('should handle partial payment', () => {
    const result = service.payment(inputInvoice, inputInvoice.outstandingAmount,inputPayment1);
    expect(result.paymentAmount.outstanding).toBe(700);
    expect(result.updatePaymentMethod.status).toBe('PARTIALLY_PAID');
  });

  it('should handle full payment', () => {
    const customInputPayment1 = {
      ...inputPayment1,
      amount: 1000.00
    }
    const result = service.payment(inputInvoice, inputInvoice.outstandingAmount,customInputPayment1);
    expect(result.paymentAmount.outstanding).toBe(0);
    expect(result.updatePaymentMethod.status).toBe('PAID');
  });

  it('should handle unfulfilled payment', () => {
    const customInputPayment1 = {
      ...inputPayment1,
      amount: 0.00
    }
    const result = service.payment(inputInvoice, inputInvoice.outstandingAmount,customInputPayment1);
    expect(result.paymentAmount.outstanding).toBe(1000.00);
    expect(result.updatePaymentMethod.status).toBe('UNPAID');
  });
});
