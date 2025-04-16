import { prisma } from "../../config/db";
import { GoldPurityForm } from "../../types";
import { paginate } from "../../utils";

export const goldPurityService = {
  async createGoldPurity(payload: Omit<GoldPurityForm, 'id'>): Promise<GoldPurityForm> {
    const requiredFields: (keyof typeof payload)[] = ['karat', 'percentage', 'description'];

    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null || payload[field] === '') {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const goldPurity = await prisma.goldPurity.create({
      data: {
        karat: payload.karat,
        percentage: payload.percentage,
        description: payload.description,
      },
    });

    return goldPurity;
  },

  async getAllGoldPurities(): Promise<GoldPurityForm[]> {
    return await prisma.goldPurity.findMany();
  },

  async getGoldPuritiesPagination(page = 1, limit = 10) {
    return await paginate(
      (args) => prisma.goldPurity.findMany(args),
      () => prisma.goldPurity.count(),
      { page, limit },
      { orderBy: { description: 'desc' } }
    )
  },

  async getGoldPurityById(id: string): Promise<GoldPurityForm | null> {
    return await prisma.goldPurity.findUnique({
      where: { id },
    });
  },

  async updateGoldPurity(id: string, payload: Partial<Omit<GoldPurityForm, 'id'>>): Promise<GoldPurityForm> {
    const existing = await prisma.goldPurity.findUnique({ where: { id } });
    if (!existing) {
      throw new Error('Gold purity not found');
    }

    const updated = await prisma.goldPurity.update({
      where: { id },
      data: payload,
    });

    return updated;
  },

  async deleteGoldPurity(id: string): Promise<void> {
    const existing = await prisma.goldPurity.findUnique({ where: { id } });
    if (!existing) {
      throw new Error('Gold purity not found');
    }

    await prisma.goldPurity.delete({
      where: { id },
    });
  },
};

