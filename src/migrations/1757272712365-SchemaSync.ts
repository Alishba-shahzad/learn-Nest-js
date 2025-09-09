import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1757272712365 implements MigrationInterface {
    name = 'SchemaSync1757272712365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coffee_event" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "payload" json NOT NULL, CONSTRAINT "PK_07799a4290021e925da9f2f86d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_53326542f241ca040b19f8a6fb" ON "coffee_event" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1c4f9ed51b3cd81f25809c229" ON "coffee_event" ("name", "type") `);
        await queryRunner.query(`ALTER TABLE "coffees" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "coffees" ADD "recommendation" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "recommendation"`);
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "description"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a1c4f9ed51b3cd81f25809c229"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53326542f241ca040b19f8a6fb"`);
        await queryRunner.query(`DROP TABLE "coffee_event"`);
    }

}
