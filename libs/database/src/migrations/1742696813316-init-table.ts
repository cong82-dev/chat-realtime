import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTable1742696813316 implements MigrationInterface {
  name = 'InitTable1742696813316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "friendships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(20) NOT NULL DEFAULT 'pending', "initiator_id" uuid, "recipient_id" uuid, CONSTRAINT "PK_08af97d0be72942681757f07bc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "conversation_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "joined_at" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."conversation_members_role_enum" NOT NULL DEFAULT 'member', "conversation_id" uuid, "member_id" uuid, CONSTRAINT "PK_33146a476696a973a14d931e675" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message_attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_url" text NOT NULL, "file_type" "public"."message_attachments_file_type_enum" NOT NULL, "message_id" uuid, CONSTRAINT "PK_e5085d973567c61e9306f10f95b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "message_type" character varying(20) NOT NULL, "deleted_at" TIMESTAMP, "sender_id" uuid, "conversation_id" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "type" "public"."conversations_type_enum" NOT NULL DEFAULT 'private', "created_by_id" uuid, "conversationMembersId" uuid, "messagesId" uuid, CONSTRAINT "UQ_ed3a6630239ce450576ea848581" UNIQUE ("name"), CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "avatar_url" text, "status" "public"."users_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendships" ADD CONSTRAINT "FK_2c226ba4395916cbb31619471dc" FOREIGN KEY ("initiator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendships" ADD CONSTRAINT "FK_721201df6b9dbd63e0f86958cc6" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_36340a1704b039608e34244511f" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_d379e789f06de157aed8c7a8a70" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_attachments" ADD CONSTRAINT "FK_bf65c3db8657cef6197b68b8c88" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_22133395bd13b970ccd0c34ab22" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversations" ADD CONSTRAINT "FK_6e93e2251a9baafc3d56bfdded0" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversations" ADD CONSTRAINT "FK_a196bb370c71761fae480ae2454" FOREIGN KEY ("conversationMembersId") REFERENCES "conversation_members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversations" ADD CONSTRAINT "FK_a7ee3807afdadca1a485d370b0c" FOREIGN KEY ("messagesId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_a7ee3807afdadca1a485d370b0c"`);
    await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_a196bb370c71761fae480ae2454"`);
    await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_6e93e2251a9baafc3d56bfdded0"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_22133395bd13b970ccd0c34ab22"`);
    await queryRunner.query(`ALTER TABLE "message_attachments" DROP CONSTRAINT "FK_bf65c3db8657cef6197b68b8c88"`);
    await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_d379e789f06de157aed8c7a8a70"`);
    await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_36340a1704b039608e34244511f"`);
    await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_721201df6b9dbd63e0f86958cc6"`);
    await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_2c226ba4395916cbb31619471dc"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "conversations"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "message_attachments"`);
    await queryRunner.query(`DROP TABLE "conversation_members"`);
    await queryRunner.query(`DROP TABLE "friendships"`);
  }
}
