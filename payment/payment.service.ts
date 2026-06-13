import {Injectable} from '@nestjs/common';
import {CreatePaymentDto} from './dto/create-payment.dto';
import {Payment} from "./interfaces/payment/payment.interface";
import {PaymentMethod} from "../common/enums/payment-method.enum";
import {PaymentStatus} from "../common/enums/payment-status.enum";
import {InvoiceStatus} from "../common/enums/invoice-status.enum";

@Injectable()
export class PaymentService {
    validatePaymentMethod(method: string): boolean {
        return (Object.values(PaymentMethod) as string[]).includes(method);
    }

    payment(
        invoice: any,
        paymentAmount: number,
        paymentMethod: Payment
    ) {
        if (paymentAmount <= 0) {
            throw new Error('Invalid amount');
        }
        if (!this.validatePaymentMethod(paymentMethod.paymentMethod)) {
            throw new Error('Unsupported payment method');
        }
        const outstanding = paymentAmount - paymentMethod.amount;
        let statusPayment;
        if (outstanding === 0) {
            statusPayment = PaymentStatus.Paid;
        }  else if(outstanding === paymentAmount) {
            statusPayment = PaymentStatus.Unpaid;
        } else if (outstanding > 0) {
            statusPayment = PaymentStatus.PartiallyPaid;
        } else {
            statusPayment = PaymentStatus.OverDue;
        }
        const updatePaymentMethod = {
            ...paymentMethod,
            status: statusPayment,
        }
        return {
            updatePaymentMethod,
            paymentAmount: {
                outstanding: outstanding
            }
        }
    }

    create(createPaymentDto: CreatePaymentDto) {
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
        const result1 = this.payment(inputInvoice, inputInvoice.outstandingAmount, inputPayment1);
        console.log('After payment1: outstanding:', result1)
        const newInputInvoice = {
            ...inputInvoice,
            outstandingAmount: result1.paymentAmount.outstanding
        }
        const result2 = this.payment(newInputInvoice, newInputInvoice.outstandingAmount, inputPayment2);
        console.log('After payment2: outstanding:', result2)
        return {
           status: result2.updatePaymentMethod.status,
           outstanding: result2.paymentAmount.outstanding
        }
    }
}
