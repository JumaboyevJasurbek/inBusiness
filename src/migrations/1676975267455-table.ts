import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676975267455 implements MigrationInterface {
    name = 'table1676975267455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "superUsers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" character varying(64) NOT NULL, "phone_number" character varying(32) NOT NULL, "email" character varying(128) NOT NULL, "project_direction" character varying(64) NOT NULL, "country" character varying(64) NOT NULL, "tg_username" character varying(64) NOT NULL, "inst_username" character varying(64) NOT NULL, "experience" character varying(64) NOT NULL, "comments" character varying(64) NOT NULL, "status" boolean NOT NULL DEFAULT false, "project_img" character varying NOT NULL, "company_img" character varying NOT NULL, "userIdUserId" uuid, CONSTRAINT "PK_80247710852a68177c159848d28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "superUsers" ADD CONSTRAINT "FK_c95ea5e479931201cd1ef4dde04" FOREIGN KEY ("userIdUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "superUsers" DROP CONSTRAINT "FK_c95ea5e479931201cd1ef4dde04"`);
        await queryRunner.query(`DROP TABLE "superUsers"`);
    }

}
