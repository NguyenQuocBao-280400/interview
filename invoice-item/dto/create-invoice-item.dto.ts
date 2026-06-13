import {IsNumber, IsString} from "class-validator";

export class CreateInvoiceItemDto {
    // @IsString()
    // id: string;

    @IsString()
    description: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    unitPrice: number;

    // @IsNumber()
    // lineTotal: number;
    //
    // @IsNumber()
    // taxRate: number;
    //
    // @IsNumber()
    // taxAmount: number;
}