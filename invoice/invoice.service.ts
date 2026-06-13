import {Injectable} from '@nestjs/common';
import {CreateInvoiceDto} from './dto/create-invoice.dto';
import {InvoiceItem} from "../invoice-item/interfaces/invoice-item/invoice-item.interface";
import {InvoiceTotals} from "./interfaces/invoice/invoice-totals.interfaces";

@Injectable()
export class InvoiceService {
    calculateInvoiceTotal(
        items: InvoiceItem[],
        taxRate: number
    ): InvoiceTotals {
        const totalForLineItems = items.reduce((sum, item) => sum + item.lineTotal, 0);
        const totalTax = totalForLineItems * taxRate;
        const totalInvoice = totalForLineItems + totalTax;
        return {
            items,
            totalForLineItems,
            totalTax,
            totalInvoice
        }
    }

    create(createInvoiceDto: CreateInvoiceDto) {
        const items = [
            {id: '1', description: "Monthly Fee", quantity: 1, unitPrice: 550.00},
            {id: '2', description: "Activity Fee", quantity: 2, unitPrice: 25.50}
        ];
        const taxRate = 0.07; // 7% GST
        const lineItems = items.map((item) => ({
            ...item,
            lineTotal: item.quantity * item.unitPrice,
            taxRate: taxRate,
            taxAmount: item.quantity * item.unitPrice * taxRate
        }));
        const result = this.calculateInvoiceTotal(lineItems, taxRate);
        return {
            SubTotal: result.totalForLineItems,
            Tax: result.totalTax,
            Total: result.totalInvoice
        }
    }
}
