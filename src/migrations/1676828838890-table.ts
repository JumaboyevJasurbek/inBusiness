import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676828838890 implements MigrationInterface {
    name = 'table1676828838890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "userIdUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_f6e519e5bfb58ecdd9dadded57e" FOREIGN KEY ("userIdUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_f6e519e5bfb58ecdd9dadded57e"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "userIdUserId"`);
    }

}
