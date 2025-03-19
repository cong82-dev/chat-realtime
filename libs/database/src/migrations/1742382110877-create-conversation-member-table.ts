import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConversationMemberTable1742382110877 implements MigrationInterface {
  name = 'CreateConversationMemberTable1742382110877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."conversation_members_role_enum" AS ENUM('admin', 'member')`);
    await queryRunner.query(
      `CREATE TABLE "conversation_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "joined_at" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."conversation_members_role_enum" NOT NULL DEFAULT 'member', "conversationId" uuid, "member_id" uuid, CONSTRAINT "PK_33146a476696a973a14d931e675" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "conversations" ADD "conversationMembersId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_9a23e356db3cedb8d9725d01d1a" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_d379e789f06de157aed8c7a8a70" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversations" ADD CONSTRAINT "FK_a196bb370c71761fae480ae2454" FOREIGN KEY ("conversationMembersId") REFERENCES "conversation_members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_a196bb370c71761fae480ae2454"`);
    await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_d379e789f06de157aed8c7a8a70"`);
    await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_9a23e356db3cedb8d9725d01d1a"`);
    await queryRunner.query(`ALTER TABLE "conversations" DROP COLUMN "conversationMembersId"`);
    await queryRunner.query(`DROP TABLE "conversation_members"`);
    await queryRunner.query(`DROP TYPE "public"."conversation_members_role_enum"`);
  }
}
