import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMeasureTable1648739200000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "measure",
            columns: [
                {
                    name: "uuid",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: `uuid_generate_v4()`
                },
                {
                    name: "customerCode",
                    type: "varchar",
                },
                {
                    name: "measureDatetime",
                    type: "timestamp",
                },
                {
                    name: "measureType",
                    type: "varchar",
                },
                {
                    name: "imageUrl",
                    type: "varchar",
                },
                {
                    name: "measureValue",
                    type: "varchar",
                },
                {
                    name: "confirmed",
                    type: "boolean",
                    default: false
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("measure");
    }

}
