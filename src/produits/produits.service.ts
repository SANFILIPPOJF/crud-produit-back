import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitsService {
  async create(createProduitDto: CreateProduitDto) {
    try {
      return await Produit.create({...createProduitDto}).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await Produit.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await Produit.findOneBy({id});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByName(name: string) {
    try {
      return await Produit.findOneBy({name});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async update(id: number, updateProduitDto: UpdateProduitDto) {
    try {
      const produit = await Produit.findOneBy({ id });
      if (updateProduitDto.name) produit!.name = updateProduitDto.name;
      if (updateProduitDto.quantity) produit!.quantity = updateProduitDto.quantity;
      if (updateProduitDto.price) produit!.price = updateProduitDto.price;
      return await produit!.save();
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const produit = await Produit.findOneBy({id})
      return produit!.remove();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
