import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1587400286382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
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
                    name: "username",
                    type: "varchar",
                    length: "45",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "roleId",
                    type: "int",
                    width: 11,
                    isNullable: true
                },
                {
                    name: "salt",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "iterations",
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
            ],
            foreignKeys: [
                {
                    name: 'user-role',
                    columnNames: ['roleId'],
                    referencedTableName: 'role',
                    referencedColumnNames: ['id']
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user', true, true);
    }

}
