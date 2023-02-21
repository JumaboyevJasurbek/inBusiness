import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676827077961 implements MigrationInterface {
    name = 'table1676827077961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(32) NOT NULL, "password" character varying(32) NOT NULL, "phoneNumber" character varying(32) NOT NULL, "email" character varying(32) NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
