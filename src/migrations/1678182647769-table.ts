import { MigrationInterface, QueryRunner } from "typeorm";

export class table1678182647769 implements MigrationInterface {
    name = 'table1678182647769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_49e3fb9239e1ea395842f863bfb"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "projectIdId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "categoryIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_af5e999d2fe7e3149dfb0649be8" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_af5e999d2fe7e3149dfb0649be8"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "projectIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_49e3fb9239e1ea395842f863bfb" FOREIGN KEY ("projectIdId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
