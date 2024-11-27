import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTable1732372466147 implements MigrationInterface {
    name = 'CreateNewTable1732372466147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP FOREIGN KEY \`FK_060d5839fbc02bdca25f57a2206\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP FOREIGN KEY \`FK_e635eb7677b92b43c746afb0c33\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_5fd7e1818269b78c2740fc27771\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_b202e040bcab8687fa432628fba\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_2cc808bbdb6f4e1169a8916d0a6\``);
        await queryRunner.query(`ALTER TABLE \`lists\` DROP FOREIGN KEY \`FK_35ce69b6248c3fdac997094de16\``);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_a18ef38e5a44e510d18d2845e8d\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_24cae15cf042f411ce2ccae3c1f\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_d8433ad1d7964e95ddad79d2cfe\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_554429ae7394b1fd4f26f45a623\``);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`listIDId\` \`listId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`lists\` CHANGE \`boardIDId\` \`boardId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`boards\` CHANGE \`projectIDId\` \`projectId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`userIDId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP COLUMN \`cardIDId\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP COLUMN \`userIDId\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`cardIDId\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`userIDId\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP COLUMN \`projectIDId\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP COLUMN \`userIDId\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD \`cardId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD \`cardId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD \`projectId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD CONSTRAINT \`FK_e9143a029e920623c7928edb30b\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD CONSTRAINT \`FK_2727bc359bb88dca9236d2cb96e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e0d58e922daf1775d69a9965ad0\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_8e71fba12a609e08cf311fde6d9\` FOREIGN KEY (\`listId\`) REFERENCES \`lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lists\` ADD CONSTRAINT \`FK_05460f5df61d54daeaf96c54c00\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_074efe1a079786d8c076bf00fff\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_08d1346ff91abba68e5a637cfdb\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_d19892d8f03928e5bfc7313780c\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_692a909ee0fa9383e7859f9b406\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_692a909ee0fa9383e7859f9b406\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_d19892d8f03928e5bfc7313780c\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_08d1346ff91abba68e5a637cfdb\``);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_074efe1a079786d8c076bf00fff\``);
        await queryRunner.query(`ALTER TABLE \`lists\` DROP FOREIGN KEY \`FK_05460f5df61d54daeaf96c54c00\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_8e71fba12a609e08cf311fde6d9\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e0d58e922daf1775d69a9965ad0\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP FOREIGN KEY \`FK_2727bc359bb88dca9236d2cb96e\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP FOREIGN KEY \`FK_e9143a029e920623c7928edb30b\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`cardId\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`card_members\` DROP COLUMN \`cardId\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD \`userIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD \`projectIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD \`userIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD \`cardIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD \`userIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD \`cardIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`userId\` \`userIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`boards\` CHANGE \`projectId\` \`projectIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`lists\` CHANGE \`boardId\` \`boardIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`listId\` \`listIDId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_554429ae7394b1fd4f26f45a623\` FOREIGN KEY (\`userIDId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_d8433ad1d7964e95ddad79d2cfe\` FOREIGN KEY (\`projectIDId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_24cae15cf042f411ce2ccae3c1f\` FOREIGN KEY (\`userIDId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_a18ef38e5a44e510d18d2845e8d\` FOREIGN KEY (\`projectIDId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lists\` ADD CONSTRAINT \`FK_35ce69b6248c3fdac997094de16\` FOREIGN KEY (\`boardIDId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_2cc808bbdb6f4e1169a8916d0a6\` FOREIGN KEY (\`listIDId\`) REFERENCES \`lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_b202e040bcab8687fa432628fba\` FOREIGN KEY (\`cardIDId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_5fd7e1818269b78c2740fc27771\` FOREIGN KEY (\`userIDId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD CONSTRAINT \`FK_e635eb7677b92b43c746afb0c33\` FOREIGN KEY (\`cardIDId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_members\` ADD CONSTRAINT \`FK_060d5839fbc02bdca25f57a2206\` FOREIGN KEY (\`userIDId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
