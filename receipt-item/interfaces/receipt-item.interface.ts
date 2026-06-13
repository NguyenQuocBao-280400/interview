export interface ReceiptItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    tax?: number;
    paymentMethod?: string;
    notes?: string;
}