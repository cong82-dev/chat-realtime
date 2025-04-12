import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnStatusFrienship1744036639778 implements MigrationInterface {
    name = 'UpdateColumnStatusFrienship1744036639778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friendships" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."friendships_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'blocked', 'unfriended')`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD "status" "public"."friendships_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friendships" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."friendships_status_enum"`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD "status" character varying(20) NOT NULL DEFAULT 'pending'`);
    }

}
