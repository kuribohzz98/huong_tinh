import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createParking1587354257714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "parking",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "position",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ['PARKED'],
                    isNullable: true
                },
                {
                    name: "time",
                    type: "int",
                    width: 11,
                    isNullable: true
                },
                {
                    name: "cost",
                    type: "int",
                    width: 11,
                    isNullable: true
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "datetime",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("parking", true, true);
    }

}
