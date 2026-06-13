import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import {InvoiceItem} from "../../invoice-item/entities/invoice-item.entity";
import {InvoiceStatus} from "../../common/enums/invoice-status.enum";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    invoiceNumber: string;

    @Column({ type: 'date' })
    invoiceDate: Date;

    @OneToMany(() => InvoiceItem, item => item.invoice, { cascade: true })
    items: InvoiceItem[];

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalTax: number;

    @Column('decimal', { precision: 10, scale: 2 })
    outstandingAmount: number;

    @Column({
        type: 'enum',
        enum: InvoiceStatus,
        default: InvoiceStatus.Unpaid,
    })
    status: InvoiceStatus;
}
