# Invoice & Payment Processing System (NestJS)

##  Documentation
Hệ thống này được xây dựng bằng [NestJS](ca://s?q=NestJS_framework) để quản lý hóa đơn và xử lý thanh toán.  
Các module chính:
- **Invoice System**: quản lý từng item, tính toán subtotal, thuế (7% GST), và tổng thanh toán, tổng thuế
- **Payment Processing**: hỗ trợ nhiều phương thức thanh toán (cash, banktransfer), xử lý partial payment, overpayment, và tracking trạng thái.

---

##  Design Decisions & Trade-offs
- **NestJS** được chọn vì kiến trúc modular, dễ mở rộng.
- **Jest** dùng cho unit test vì tích hợp tốt với TypeScript.
- **Tax calculation** cố định 7% GST để đơn giản hóa (trade-off: chưa hỗ trợ nhiều loại thuế).
- **Payment methods** được quản lý bằng enum → dễ validate nhưng hạn chế nếu muốn thêm dynamic methods từ DB.

---

## Known Limitations / Assumptions
- Chỉ hỗ trợ một loại thuế (GST 7%).
- Không có tích hợp với cổng thanh toán thực tế 
- Payment status chỉ có 5 trạng thái: `UNPAID`, `PARTIALLY_PAID`, `PAID`, `OVER_DUE`, `CANCELLED`

---

##  Example Usage
### Invoice Calculation
```ts
const items = [
  { id: '1', description: "Monthly Fee", quantity: 1, unitPrice: 500.00 },
  { id: '2', description: "Activity Fee", quantity: 2, unitPrice: 25.50 },
];
const taxRate = 0.07; // 7% GST
const lineItems = items.map((item) => ({
  ...item,
  lineTotal: item.quantity * item.unitPrice,
  taxRate: taxRate,
  taxAmount: item.quantity * item.unitPrice * taxRate
 }));
const result = invoiceService.calculateInvoiceTotal(lineItems, taxRate)
// { totalForLineItems: 551, totalTax: 38.57, totalInvoice: 589.57 }
```
--- 
##  Yêu cầu
- Node.js >= 18
- npm >= 9
##  Cài đặt dependency
- npm install
## Running the Project
- npm run start:dev
## Chạy toàn bộ test
- npm run test



