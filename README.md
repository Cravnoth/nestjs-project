# NestJS Application

Este microsserviço, desenvolvido em NodeJS e [NestJS](https://docs.nestjs.com/) como framework, tem como objetivo simular o cadastro de usuários.
Possui as o CRUD completo, utilizando uma chave de segurança para o acesso aos endpoints.
A seguir, darei o passo a passo de como clonar o repositório, intalar as dependências e rodar o projeto localmente.


## 🚀 Começando

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto, é imprescindível ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).
Optei pelo uso do [PostgreSQL](https://www.postgresql.org/) como banco relacional, então caso não tenha o mesmo instalado,
será necessário que utilize o [Docker](https://www.docker.com/products/docker-desktop/) ok?

### 📋 Pré-requisitos

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/) ({ node: 17.4.0, npm: 8.8.0 })
- [TypeScript](https://www.typescriptlang.org/) ({ tsc: 5.2.2 })

### 🔧 Instalação

```bash
# Clone este repositório
$ git clone https://github.com/Cravnoth/nestjs-project.git

# Acesse a pasta do projeto no terminal/cmd
$ cd nestjs-project

# Instale as dependências
$ npm ci
```

### 🎲 Banco de dados (servidor)

Caso utilize o PostgreSQL, basta executar os seguintes comandos:

```bash
# Execute as migrations + seeders
$ npm run migration:seed:all
```
Isso fará com que a tabela *users* seja criada no banco de dados.

Com isso, serão criados dois registros de exemplo na tabela users.

### 🐋 Container

Se a opção for o uso do Docker, existe na raiz do projeto um arquivo docker-compose,
que irá instalar o PostgreSQL em um conteiner.
Para isso, basta rodar esse comando:

```bash
# Subir o container Docker
$ npm run infra:up
```
Após rodar o comando, é só seguir os passos descritos na etapa de migration do banco de dados.

Para derrubar o container e os volumes gerados, basta rodar:

```bash
# Remover o container Docker e volumes
$ npm run infra:down
```

# Execute a aplicação
```bash
$ npm start
```
O servidor inciará na porta:3000 (ou a porta que foi definida no arquivo .env.development).

### ⚙️ Executando os testes

Para rodar os testes, basta utilizar este comando via terminal/cmd:

```bash
# Irá rodar os testes de integração e unitários
$ npm t

# Irá rodar apenas os testes de integração
$ npm run test:integration

# Irá rodar apenas os testes unitários
$ npm run test:unit
```
Caso queira um registro com o coverage:

```bash
# Irá rodar os testes e gerar a % de cobertura
$ npm run test:cov
```

### Envs
Existem dois arquivos de variáveis de ambiente. Em ambos exite a variável com a secret que funciona para a validação do header de autenticação *authentication*
Caso queira utilizar o swagger ou a própria collection do postman, utilize com o valor *eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjY0Nzg3NzQsImV4cCI6MTc1ODAxNDc3NH0.LpwoWrmMXnzQCwMbUTbShsJnkI5fIWm5OzwUfmfp_WY*

### 📦 Documentação

Um arquivo com extensão .json se encontra na pasta:
```src/shared/docs```

O mesmo pode ser importado dentro do [Postman](https://www.postman.com/), para facilitar o acesso aos endpoints.

A documentação com o swagger, pode ser acessada pela url [/doc](http://localhost:3000/doc/) com o servidor rodando.
