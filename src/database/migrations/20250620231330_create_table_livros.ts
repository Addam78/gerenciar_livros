import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('livros',(table) =>{
        table.increments('id').primary()
        table.string('nome_livro').notNullable()
        table.string('nome_autor').notNullable()
        table.string('genero')
        table.float('preço')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('livros')
}

