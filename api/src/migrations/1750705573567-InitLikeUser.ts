import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB implements MigrationInterface {
    name = 'support_lk_db';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user"
            (
                "id"        SERIAL                NOT NULL,
                "login"     character varying(20) NOT NULL,
                "password"  character varying     NOT NULL,
                "createdAt" TIMESTAMP             NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_user_login" UNIQUE ("login"),
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "like"
            (
                "cat_id"         character varying NOT NULL,
                "unique_like_id" integer           NOT NULL,
                "createdAt"      TIMESTAMP         NOT NULL DEFAULT now(),
                "userId"         integer,
                CONSTRAINT "UQ_like_unique_like_id" UNIQUE ("unique_like_id"),
                CONSTRAINT "UQ_like_cat_id_user" UNIQUE ("cat_id", "userId"),
                CONSTRAINT "PK_like_cat_id" PRIMARY KEY ("cat_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "like"
                ADD CONSTRAINT "FK_like_user" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "like" DROP CONSTRAINT "FK_like_user"`,
        );
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
