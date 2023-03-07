import { MigrationInterface, QueryRunner } from "typeorm";

export class table1678182515735 implements MigrationInterface {
    name = 'table1678182515735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "projectIdId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_49e3fb9239e1ea395842f863bfb" FOREIGN KEY ("projectIdId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_49e3fb9239e1ea395842f863bfb"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
