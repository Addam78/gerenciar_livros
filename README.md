# Gerenciador de Livros

CRUD simples de livros desenvolvido como projeto de estudo. Permite cadastrar, editar, visualizar e excluir livros por meio de uma interface web.

> **Projeto de aprendizado** — não destinado a produção.

## Stack

- [Fastify](https://fastify.dev/) — framework HTTP
- [Handlebars](https://handlebarsjs.com/) via `@fastify/view` — templates
- [Knex.js](https://knexjs.org/) — query builder SQL
- [SQLite](https://www.sqlite.org/) — banco de dados local
- [Bootstrap 5](https://getbootstrap.com/) — estilização
- TypeScript + ts-node-dev

## Como rodar

**Pré-requisitos:** Node.js 22+ e Yarn instalados.

```bash
# Clone o repositório
git clone <url-do-repo>
cd gerencia_livros_ts

# Instale as dependências
yarn install

# Execute as migrations (cria a tabela de livros)
yarn knex migrate:latest --knexfile knexfile.ts

# Inicie o servidor em modo dev
yarn dev
```

Acesse `http://localhost:3000` no navegador.

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Lista todos os livros |
| GET | `/adiciona_livros` | Formulário de cadastro |
| POST | `/inserir_livros` | Salva novo livro |
| GET | `/editar_livro/:id` | Formulário de edição |
| POST | `/edicao_livro/:id` | Atualiza livro |
| GET | `/deletar/:id` | Remove livro |

## Campos do livro

| Campo | Tipo |
|-------|------|
| Nome do livro | Texto |
| Autor | Texto |
| Gênero | Texto |
| Preço | Numérico |
