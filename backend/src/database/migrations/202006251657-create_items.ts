import Knex from 'knex';

const TABLE_NAME = 'items';

export const up = async function(knex:Knex) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.integer('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
};

export const down = async function(knex:Knex) {
  return knex.schema.dropTable(TABLE_NAME);
};