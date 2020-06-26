import Knex from 'knex';

const TABLE_NAME = 'points';

export const up = async function(knex:Knex) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.integer('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('UF').notNullable();
  });
};

export const down = async function(knex:Knex) {
  return knex.schema.dropTable(TABLE_NAME);
};