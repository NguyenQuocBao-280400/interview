import {InvoiceStatus} from "../../common/enums/invoice-status.enum";
import {CreateInvoiceItemDto} from "../../invoice-item/dto/create-invoice-item.dto";
import { IsString, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceDto {
    @IsString()
    invoiceNumber: string;

    @IsDateString()
    invoiceDate: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateInvoiceItemDto)
    items: CreateInvoiceItemDto[];

    @IsString()
    status: InvoiceStatus;
}