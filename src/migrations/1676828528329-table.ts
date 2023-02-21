import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676828528329 implements MigrationInterface {
    name = 'table1676828528329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phoneNumber" TO "phone_number"`);
        await queryRunner.query(`CREATE TABLE "admin" ("admin_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(32) NOT NULL, "phone_number" character varying(32) NOT NULL, "password" character varying(32) NOT NULL, CONSTRAINT "PK_08603203f2c50664bda27b1ff89" PRIMARY KEY ("admin_id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" character varying(64) NOT NULL, "phone_number" character varying(32) NOT NULL, "email" character varying(128) NOT NULL, "project_direction" character varying(64) NOT NULL, "country" character varying(64) NOT NULL, "tg_username" character varying(64) NOT NULL, "inst_username" character varying(64) NOT NULL, "experience" character varying(64) NOT NULL, "comments" character varying(64) NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(128) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(32) NOT NULL`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone_number" TO "phoneNumber"`);
    }

}
