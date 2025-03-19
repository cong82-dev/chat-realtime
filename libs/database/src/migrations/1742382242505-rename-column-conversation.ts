import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnConversation1742382242505 implements MigrationInterface {
  name = 'RenameColumnConversation1742382242505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_9a23e356db3cedb8d9725d01d1a"`);
    await queryRunner.query(`ALTER TABLE "conversation_members" RENAME COLUMN "conversationId" TO "conversation_id"`);
    await queryRunner.query(
      `ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_36340a1704b039608e34244511f" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_36340a1704b039608e34244511f"`);
    await queryRunner.query(`ALTER TABLE "conversation_members" RENAME COLUMN "conversation_id" TO "conversationId"`);
    await queryRunner.query(
      `ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_9a23e356db3cedb8d9725d01d1a" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
