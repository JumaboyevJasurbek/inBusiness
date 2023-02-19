import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676827304534 implements MigrationInterface {
    name = 'table1676827304534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    }

}
