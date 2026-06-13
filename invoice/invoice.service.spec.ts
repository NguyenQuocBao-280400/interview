import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceService],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should calculate totals correctly', () => {
    const items = [
      {id: '1', description: "Monthly Fee", quantity: 1, unitPrice: 500.00},
      {id: '2', description: "Activity Fee", quantity: 2, unitPrice: 25.50}
    ];
    const taxRate = 0.07; // 7% GST
    const lineItems = items.map((item) => ({
      ...item,
      lineTotal: item.quantity * item.unitPrice,
      taxRate: taxRate,
      taxAmount: item.quantity * item.unitPrice * taxRate
    }));
    const result = service.calculateInvoiceTotal(lineItems, taxRate);
    console.log(result)
    expect(result.totalForLineItems).toBe(551.00);
    expect(result.totalTax).toBe(38.57);
    expect(result.totalInvoice).toBe(589.57);
  });
});
