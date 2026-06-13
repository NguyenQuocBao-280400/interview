export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    taxRate: number;
    taxAmount: number;
}