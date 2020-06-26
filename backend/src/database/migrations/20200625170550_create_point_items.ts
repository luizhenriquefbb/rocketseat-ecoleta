import * as Knex from "knex";

const TABLE_NAME = 'points_items';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(TABLE_NAME, function (table) {
        table.integer('id').primary();
        table.integer('point_id').notNullable().references('id').inTable('points');
        table.integer('item_id').notNullable().references('id').inTable('items');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(TABLE_NAME);
}

