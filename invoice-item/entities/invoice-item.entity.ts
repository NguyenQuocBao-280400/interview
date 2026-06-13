import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import {Invoice} from "../../invoice/entities/invoice.entity";

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    description: string;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @ManyToOne(() => Invoice, invoice => invoice.items, { onDelete: 'CASCADE' })
    invoice: Invoice;
}
