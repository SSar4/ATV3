import knex from 'knex'


export async function up(knex: knex){

    return knex.schema.createTable('orfanato',function(table){
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('sobre').notNullable();
        table.string('telefone').notNullable();
        table.string('intrucoes').notNullable();
        table.string('h_visita').notNullable();
        table.boolean('fim_semana').notNullable();
        table.string('longitude').notNullable();
        table.string('latitude').notNullable()
    });


}


//caso ocarra alguma situação atipica ele reverte
export async function down(knex: knex) {
    return knex.schema.dropTable('orfanato')
}

