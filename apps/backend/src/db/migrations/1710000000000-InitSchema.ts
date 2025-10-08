import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1710000000000 implements MigrationInterface {
  name = 'InitSchema1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(`
      CREATE TABLE "employee" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "firstName" varchar(100) NOT NULL,
        "lastName" varchar(100) NOT NULL,
        "email" varchar(160) NOT NULL,
        "role" varchar(20) NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_employee_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_employee_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "attendance_record" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "type" varchar(3) NOT NULL,
        "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "lat" double precision NULL,
        "lng" double precision NULL,
        "note" text NULL,
        "employeeId" uuid NOT NULL,
        CONSTRAINT "PK_attendance_record_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_attendance_employee" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`CREATE INDEX "IDX_attendance_employee" ON "attendance_record" ("employeeId")`);
    await queryRunner.query(`CREATE INDEX "IDX_attendance_timestamp" ON "attendance_record" ("timestamp")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_attendance_timestamp"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_attendance_employee"`);
    await queryRunner.query(`ALTER TABLE "attendance_record" DROP CONSTRAINT "FK_attendance_employee"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "attendance_record"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "employee"`);
  }
}

