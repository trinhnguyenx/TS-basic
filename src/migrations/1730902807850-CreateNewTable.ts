import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTable1730902807850 implements MigrationInterface {
    name = 'CreateNewTable1730902807850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_19ac373d1ef1e68e87e5a3633db\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`cardMembersId\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD \`cardsId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD \`usersId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD \`projectsId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD CONSTRAINT \`FK_e4cd500b0f50d1f6326a6239200\` FOREIGN KEY (\`cardsId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_c8d27a19d7496d7428743b0bdf4\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_35f0e32e67bad49e2a828b9df6d\` FOREIGN KEY (\`projectsId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_35f0e32e67bad49e2a828b9df6d\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_c8d27a19d7496d7428743b0bdf4\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP FOREIGN KEY \`FK_e4cd500b0f50d1f6326a6239200\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP COLUMN \`projectsId\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP COLUMN \`usersId\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP COLUMN \`cardsId\``);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`cardMembersId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_19ac373d1ef1e68e87e5a3633db\` FOREIGN KEY (\`cardMembersId\`) REFERENCES \`card_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
