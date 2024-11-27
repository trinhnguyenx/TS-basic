import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTable1732711056740 implements MigrationInterface {
    name = 'CreateNewTable1732711056740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board_members\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`board_members\` ADD \`boardId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`board_members\` ADD CONSTRAINT \`FK_2af5912734e7fbedc23afd07adc\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_members\` ADD CONSTRAINT \`FK_8dfe924ec592792320086ebb692\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board_members\` DROP FOREIGN KEY \`FK_8dfe924ec592792320086ebb692\``);
        await queryRunner.query(`ALTER TABLE \`board_members\` DROP FOREIGN KEY \`FK_2af5912734e7fbedc23afd07adc\``);
        await queryRunner.query(`ALTER TABLE \`board_members\` DROP COLUMN \`boardId\``);
        await queryRunner.query(`ALTER TABLE \`board_members\` DROP COLUMN \`userId\``);
    }

}
