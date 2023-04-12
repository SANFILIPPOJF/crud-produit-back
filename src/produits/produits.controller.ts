import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';

@Controller('produits')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  async create(@Body() createProduitDto: CreateProduitDto) {
    if (createProduitDto.quantity != Math.floor(createProduitDto.quantity) || createProduitDto.quantity < 0) {
      throw new HttpException("Quantity must be an positive integer",HttpStatus.FORBIDDEN);
    }
    if (createProduitDto.price < 0) throw new HttpException("Price must be positive",HttpStatus.FORBIDDEN)
    const sameProduct = await this.produitsService.findByName(createProduitDto.name);
    if (sameProduct) throw new HttpException("Product already exist",HttpStatus.CONFLICT);
    
    return await this.produitsService.create(createProduitDto);
  }

  @Get()
  async findAll() {
    const produits = await this.produitsService.findAll();
    if (produits.length == 0) throw new HttpException("Database empty",HttpStatus.NO_CONTENT);
    return produits;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    if (isNaN(+id) || Math.floor(+id) != +id || +id <0) throw new HttpException("Id must a positive integer", HttpStatus.FORBIDDEN);
    if (!updateProduitDto.name && !updateProduitDto.price && !updateProduitDto.quantity){
      throw new HttpException("Nothing to update", HttpStatus.BAD_REQUEST)
    }
    const produit = await this.produitsService.findOne(+id);
    if (!produit) throw new HttpException("Product not found", HttpStatus.NOT_FOUND);

    return this.produitsService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || Math.floor(+id) != +id || +id <0) throw new HttpException("Id must a positive integer", HttpStatus.FORBIDDEN);
    const produit = await this.produitsService.findOne(+id);
    if (!produit) throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    return this.produitsService.remove(+id);
  }
}
