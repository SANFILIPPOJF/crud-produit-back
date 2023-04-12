import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitDto } from './create-produit.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {
    @IsString()
    name: string;
    @IsNumber()
    quantity: number;
    @IsNumber()
    price: number;
}
