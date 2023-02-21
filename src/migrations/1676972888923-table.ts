import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676972888923 implements MigrationInterface {
    name = 'table1676972888923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "repeatPassword" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "status" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "project_img" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "company_img" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "company_img"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "project_img"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "repeatPassword"`);
    }

}
