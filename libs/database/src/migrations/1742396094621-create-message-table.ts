import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessageTable1742396094621 implements MigrationInterface {
    name = 'CreateMessageTable1742396094621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."message_attachments_file_type_enum" AS ENUM('image', 'video', 'audio', 'document')`);
        await queryRunner.query(`CREATE TABLE "message_attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_url" text NOT NULL, "file_type" "public"."message_attachments_file_type_enum" NOT NULL, "message_id" uuid, CONSTRAINT "PK_e5085d973567c61e9306f10f95b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message_attachments" ADD CONSTRAINT "FK_bf65c3db8657cef6197b68b8c88" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_attachments" DROP CONSTRAINT "FK_bf65c3db8657cef6197b68b8c88"`);
        await queryRunner.query(`DROP TABLE "message_attachments"`);
        await queryRunner.query(`DROP TYPE "public"."message_attachments_file_type_enum"`);
    }

}
