import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('orfanto',function(table){
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('intrucoes').notNullable();
        table.string('sobre').notNullable();
        table.string('telefone').notNullable();
        table.string('intrucoes').notNullable();
        table.string('h_visita').notNullable();
        table.boolean('fim_semana').notNullable();
        table.boolean('longitude').notNullable();
        table.boolean('latitude').notNullable()
    });


}


export async function down(knex: Knex): Promise<void> { 
    knex.schema.dropTable('orfanato');

}

