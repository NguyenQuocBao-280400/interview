import {InvoiceItem} from "../../../invoice-item/interfaces/invoice-item/invoice-item.interface";

export interface InvoiceTotals {
    items: InvoiceItem[]
    totalForLineItems: number;
    totalTax: number;
    totalInvoice: number;
}