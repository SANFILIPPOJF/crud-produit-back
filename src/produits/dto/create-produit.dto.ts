import { IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class CreateProduitDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNumber()
    quantity: number;
    @IsNumber()
    price: number;
}
