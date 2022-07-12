-- DropIndex
DROP INDEX "Category_nameC_key";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "nameC" SET DEFAULT 'category';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "nameP" SET DEFAULT 'product';
