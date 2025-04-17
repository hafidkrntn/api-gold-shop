import { prisma } from "../../config/db";
import { CategoryForm, CategoryResponse } from "../../types";
import { validateRequiredFields } from "../../utils";

export const categoryService = {
  async createCategory(payload: Omit<CategoryForm, 'id'>): Promise<CategoryForm> {
    const requiredFields: (keyof typeof payload)[] = ['description','name']
    validateRequiredFields(payload, requiredFields);

    const category = await prisma.productType.create({
      data: {
        name: payload.name,
        description: payload.description,
      }
    });

    return category
  },

  async getAllCategory(): Promise<CategoryResponse[]> {
    return await prisma.productType.findMany()
  },

  async getCategoryById(id: string): Promise<CategoryResponse> {
    const category = await prisma.productType.findUnique({ 
      where: { id },
    });
  
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
  
    return category;
  },

  async updateCategory(id: string, payload: Partial<Omit<CategoryForm, 'id'>>): Promise<CategoryForm> {
    const category = await prisma.productType.findUnique({ 
      where: { id },
    });
  
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    const updated = await prisma.productType.update({
      where: { id },
      data: payload,
    });

    return updated;
  },

  async deletedCategory(id: string): Promise<void> {
    const category = await prisma.productType.findUnique({ 
      where: { id },
    });
  
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    await prisma.productType.delete({
      where: { id },
    })
  }

}