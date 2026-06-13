import {PaymentMethod} from "../../../common/enums/payment-method.enum";
import {PaymentStatus} from "../../../common/enums/payment-status.enum";

export interface Payment {
    id: string;
    invoiceId: string;
    paymentMethod: PaymentMethod;
    amount: number;
    paymentDate: Date;
    referenceNumber: string;
    status: PaymentStatus;
}