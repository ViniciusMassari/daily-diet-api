-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
