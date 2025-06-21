import fastify from 'fastify'
const app = fastify()

import handlebars from 'handlebars';
import view from '@fastify/view'
import { join } from 'path';


import cors from 'cors'
import { request } from 'http';





import knex from "../src/database/connection"// Importa a configuração do knexfile e inicializa o knex



import formbody from '@fastify/formbody';
app.register(formbody)
//CONFIGURAÇÃO DO HANDLEBARS

// Registra o plugin de view com Handlebars
app.register(view, {
    engine: {
        handlebars: handlebars
    },
    root: join(__dirname, 'views'),
    layout: 'layouts/main',
    includeViewExtension: true,
    options: {
        
    }
});

// Adiciona o helper "eq" para comparação
handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });


// ROTA PRINCIPAL DE VISUALZIAR OS LIVROS
app.get('/', async (req,reply) =>{

    let exibir_livros = await knex.select().table('livros')
    //return exibir_livros
    return reply.view('home',{exibir_livros})
})

//ROTA PARA IR PARA PAGINA DE ADIÇÃO DOS LIVROS
app.get('/adiciona_livros', async (req,reply) =>{
    await reply.view('add_livros')
})

//ROTA PARA ADICIONAR LIVRO
app.post('/inserir_livros', async (req,reply) =>{
    try{
        const { nome_livro_form,nome_autor_form,genero_form,preço_form} = req.body

         await knex('livros').insert({
            nome_livro :nome_livro_form,
            nome_autor :nome_autor_form,
            genero :genero_form,
            preço :preço_form,
        })
    }catch(error){
        console.error(error)
    }
})

//ROTA PARA DELETAR POR MEIO DE ID , NÃO É A MALHOR PRATICA
app.get('/deletar/:id', async (req,reply) =>{

    const { id } = req.params

    try {
        const deletar = await knex('livros').where({ id }).del()

        if (deletar) {
            console.log('Livro deletado')
        }
    }catch(error){
        console.error(error)
    }
    
})

//EDITAR LIVRO
app.get('/editar_livro/:id', async (req,reply) =>{
    
    //CRIAR CONSTANTE PARA CAPTURAR ID 
    const { id } = req.params

    const livro = await knex('livros').where({id}).first()

    if(!livro){
        return 'Livro não encontrado'
    }
    return reply.view('edit_livro', {livro})
})


app.post('/edicao_livro/:id', async (req,reply) =>{
     
    const { id } = req.params;

    const { nome_livro_form,nome_autor_form,genero_form,preço_form} = req.body;

  try {
    const atualizado = await knex('livros')
      .where({ id })
      .update({ 
        nome_livro :nome_livro_form,
            nome_autor :nome_autor_form,
            genero :genero_form,
            preço :preço_form,
      });
      

    if (atualizado) {
      return reply.redirect('/');
    } else {
      return reply.status(404).send('Livro não encontrado para atualizar');
    }
  } catch (err) {
    console.error(err);
    return reply.status(500).send('Erro ao atualizar livro');
  }
})

app.listen({port:8089}, function (err,adress){
    if(err){
        app.log.error(err)
        process.exit(1)
    }else{
        console.log('Servidor rodando')
    }
})


