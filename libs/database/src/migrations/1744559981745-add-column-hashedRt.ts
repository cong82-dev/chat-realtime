import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnHashedRt1744559981745 implements MigrationInterface {
    name = 'AddColumnHashedRt1744559981745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hashed_rt" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashed_rt"`);
    }

}
