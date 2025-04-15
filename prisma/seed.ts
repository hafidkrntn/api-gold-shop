// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Hapus semua data existing (opsional)
  await prisma.priceHistory.deleteMany();
  await prisma.inventoryLog.deleteMany();
  await prisma.productCertificate.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productType.deleteMany();
  await prisma.goldPurity.deleteMany();
  await prisma.manufacturer.deleteMany();

  // Seed Product Types
  const productTypes = await prisma.productType.createMany({
    data: [
      {
        id: '550e8400-e29b-41d3-a456-426614174001',
        name: 'Cincin',
        description: 'Perhiasan untuk jari'
      },
      {
        id: '550e8400-e29b-41d3-a456-426614174002',
        name: 'Gelang',
        description: 'Perhiasan untuk pergelangan tangan'
      },
      {
        id: '550e8400-e29b-41d3-a456-426614174003',
        name: 'Kalung',
        description: 'Perhiasan untuk leher'
      },
      {
        id: '550e8400-e29b-41d3-a456-426614174004',
        name: 'Liontin',
        description: 'Hiasan yang digantungkan pada kalung'
      },
      {
        id: '550e8400-e29b-41d3-a456-426614174005',
        name: 'Anting',
        description: 'Perhiasan untuk telinga'
      },
      {
        id: '550e8400-e29b-41d3-a456-426614174006',
        name: 'Logam Mulia',
        description: 'Emas batangan atau koin'
      }
    ],
    skipDuplicates: true
  });

  // Seed Gold Purities
  const goldPurities = await prisma.goldPurity.createMany({
    data: [
      {
        id: '660e8400-e29b-41d3-a456-426614174001',
        karat: 24,
        percentage: 99.99,
        description: 'Emas murni'
      },
      {
        id: '660e8400-e29b-41d3-a456-426614174002',
        karat: 22,
        percentage: 91.6,
        description: 'Emas 22K'
      },
      {
        id: '660e8400-e29b-41d3-a456-426614174003',
        karat: 18,
        percentage: 75.0,
        description: 'Emas 18K'
      },
      {
        id: '660e8400-e29b-41d3-a456-426614174004',
        karat: 14,
        percentage: 58.3,
        description: 'Emas 14K'
      },
      {
        id: '660e8400-e29b-41d3-a456-426614174005',
        karat: 10,
        percentage: 41.7,
        description: 'Emas 10K'
      }
    ],
    skipDuplicates: true
  });

  // Seed Manufacturers
  const manufacturers = await prisma.manufacturer.createMany({
    data: [
      {
        id: '770e8400-e29b-41d3-a456-426614174001',
        name: 'PT Emas Makmur',
        address: 'Jl. Perhiasan No. 123, Jakarta',
        phone: '021-1234567',
        email: 'info@emasmakmur.com',
        contactPerson: 'Budi Santoso'
      },
      {
        id: '770e8400-e29b-41d3-a456-426614174002',
        name: 'CV Cahaya Logam',
        address: 'Jl. Mulia 45, Bandung',
        phone: '022-7654321',
        email: 'sales@cahayalogam.co.id',
        contactPerson: 'Siti Aminah'
      },
      {
        id: '770e8400-e29b-41d3-a456-426614174003',
        name: 'UD Mustika Emas',
        address: 'Jl. Kemilau 8, Surabaya',
        phone: '031-9876543',
        email: 'mustikaemas@gmail.com',
        contactPerson: 'Ahmad Fauzi'
      }
    ],
    skipDuplicates: true
  });

  // Seed Sample Products (opsional)
  const sampleProduct = await prisma.product.create({
    data: {
      name: 'Cincin Kawin 18K',
      productTypeId: '550e8400-e29b-41d3-a456-426614174001',
      purityId: '660e8400-e29b-41d3-a456-426614174003',
      manufacturerId: '770e8400-e29b-41d3-a456-426614174001',
      weight: 3.5,
      costPrice: 3500000,
      sellingPrice: 4200000,
      designDescription: 'Cincin kawin klasik dengan ukiran floral'
    }
  });
  
  await prisma.stocks.create({
    data: {
      productId: sampleProduct.id,
      quantity: 10
    }
  });

  console.log({
    productTypes,
    goldPurities,
    manufacturers,
    sampleProduct
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });