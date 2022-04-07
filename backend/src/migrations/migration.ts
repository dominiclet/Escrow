import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageToUser implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
                'ALTER TABLE "user" ADD image varchar(255)'
        );
    }
    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
                'ALTER TABLE "user" DROP COLUMN image'
        );
    }
}
