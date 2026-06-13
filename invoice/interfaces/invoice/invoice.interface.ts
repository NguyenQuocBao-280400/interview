import {InvoiceItem} from "../../../invoice-item/interfaces/invoice-item/invoice-item.interface";
import {InvoiceStatus} from "../../../common/enums/invoice-status.enum";

export interface Invoice {
    id: string;
    invoiceNumber: string;
    invoiceDate: Date;
    items: InvoiceItem[];
    totalAmount: number;
    totalTax: number;
    outstandingAmount: number;
    status: InvoiceStatus;
}