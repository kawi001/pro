/*
  Warnings:

  - The primary key for the `password_resets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_verified` on the `password_resets` table. All the data in the column will be lost.
  - You are about to drop the column `otp_id` on the `password_resets` table. All the data in the column will be lost.
  - You are about to drop the column `reset_token` on the `password_resets` table. All the data in the column will be lost.
  - You are about to drop the column `reset_token_expiry` on the `password_resets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_job_id_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_seeker_id_fkey";

-- DropForeignKey
ALTER TABLE "job_schedules" DROP CONSTRAINT "job_schedules_application_id_fkey";

-- DropForeignKey
ALTER TABLE "job_schedules" DROP CONSTRAINT "job_schedules_job_id_fkey";

-- DropForeignKey
ALTER TABLE "job_seeker_profiles" DROP CONSTRAINT "job_seeker_profiles_seeker_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_shop_id_fkey";

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_job_id_fkey";

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_seeker_id_fkey";

-- DropForeignKey
ALTER TABLE "password_resets" DROP CONSTRAINT "password_resets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_shop_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- DropForeignKey
ALTER TABLE "shop_profiles" DROP CONSTRAINT "shop_profiles_shop_id_fkey";

-- AlterTable
ALTER TABLE "password_resets" DROP CONSTRAINT "password_resets_pkey",
DROP COLUMN "is_verified",
DROP COLUMN "otp_id",
DROP COLUMN "reset_token",
DROP COLUMN "reset_token_expiry",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seeker_profiles" ADD CONSTRAINT "job_seeker_profiles_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_profiles" ADD CONSTRAINT "shop_profiles_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_profiles"("shop_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_profiles"("shop_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "job_seeker_profiles"("seeker_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "job_seeker_profiles"("seeker_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_schedules" ADD CONSTRAINT "job_schedules_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_schedules" ADD CONSTRAINT "job_schedules_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE CASCADE ON UPDATE CASCADE;
