import { IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';
export class CreateProduitDto {
    @IsString()
    @Length(1)
    name: string;
    @IsNumber()
    quantity: number;
    @IsNumber()
    price: number;
}
