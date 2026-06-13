import {ReceiptItem} from "../../../receipt-item/interfaces/receipt-item.interface";

export interface Receipt {
    id: string;
    paymentId: string;
    receiptNumber: string;
    receiptDate: Date;
    totalPaid: number;
    remainingBalance: number;
    items: ReceiptItem[];
}