import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product, ProductType, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; price: number; count: number; productTypeId: number}): Promise<Product> {
    const productType = await this.prisma.productType.findUnique({
      where: { id: data.productTypeId},
    });
    if(!productType) throw new BadRequestException("Invalid productTypeId");

    return this.prisma.product.create({
      data,
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        ProductType: true,
      }
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        ProductType: true,
      },
    });
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async update(id: number, data: { name?: string; price?: number; count?: number; productTypeId?: number}): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);

    if(data.productTypeId){
      const productType = await this.prisma.productType.findUnique({
        where: { id: data.productTypeId},
      });
      if(!productType) throw new BadRequestException("Invalid productTypeId");
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);

    await this.prisma.product.delete({
      where: { id },
    });
  }
}
