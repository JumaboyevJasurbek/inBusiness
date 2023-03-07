import { MigrationInterface, QueryRunner } from "typeorm";

export class table1678182375230 implements MigrationInterface {
    name = 'table1678182375230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("admin_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone_number" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_08603203f2c50664bda27b1ff89" PRIMARY KEY ("admin_id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "img" character varying NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project" character varying NOT NULL, "company_name" character varying(64) NOT NULL, "business_age" character varying(128) NOT NULL, "employees_number" character varying(64) NOT NULL, "payback" character varying(64) NOT NULL, "reason_for_sale" character varying NOT NULL, "website" character varying NOT NULL, "img" character varying NOT NULL, "investment_before" character varying NOT NULL, "investment_after" character varying NOT NULL, "revenue" character varying NOT NULL, "lump_cum_before" character varying NOT NULL, "lump_cum_after" character varying NOT NULL, "possible" character varying NOT NULL, "userIdUserId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "repeatPassword" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "superUsers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying(128) NOT NULL, "project_direction" character varying NOT NULL, "country" character varying(64) NOT NULL, "tg_username" character varying(64) NOT NULL, "inst_username" character varying(64) NOT NULL, "experience" character varying(64) NOT NULL, "comments" character varying(64) NOT NULL, "status" boolean NOT NULL DEFAULT false, "project_img" character varying NOT NULL, "company_img" character varying NOT NULL, CONSTRAINT "PK_80247710852a68177c159848d28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_f6e519e5bfb58ecdd9dadded57e" FOREIGN KEY ("userIdUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_f6e519e5bfb58ecdd9dadded57e"`);
        await queryRunner.query(`DROP TABLE "superUsers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
