import {IsNumber, IsString} from "class-validator";

export class CreateInvoiceItemDto {
    @IsString()
    description: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    unitPrice: number;
}