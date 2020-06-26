import Knex from 'knex';

export async function seed(knex:Knex) {
    await knex('items').insert([
        { 'title' : 'Lamps',       'image' : 'lampadas.svg'       },
        { 'title' : 'Bateries',    'image' : 'baterias.svg'       },
        { 'title' : 'Papers',      'image' : 'papeis-papelao.svg' },
        { 'title' : 'Elteronics',  'image' : 'eletronicos.svg'    },
        { 'title' : 'Organics',    'image' : 'organicos.svg'      },
        { 'title' : 'Kitchen oil', 'image' : 'oleo.svg'           },
    ]);
}