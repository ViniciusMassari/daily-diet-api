# Daily Diet API
## Api para controle de refeições dentro ou não de sua dieta
* [Sobre](#Sobre)
* [Instalação](#instalacao)
* [Como usar](#como-usar)
    * [Pre Requisitos](#pre-requisitos)
* [Testes](#testes)
* [Tecnologias](#tecnologias)
<h4 align="center"> 
    👍🏻 Finalizado !
</h4>

### Features

- [x] Cadastro de usuário
- [x] Registro de Refeição
- [X] Registro de sequência de refeições na dieta
- [X] Armazenamento de melhor sequência de refeições dentro da dieta
- [X] Exclusão de usuário
- [X] Exclusão de refeição
- [X] Alteração de dados da refeição
- [X] Retorno de métricas de usuário

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [VSCode](https://code.visualstudio.com/) e [Docker](https://docs.docker.com/manuals/)

### 🎲 Rodando o Back End (servidor)
```bash
# Clone este repositório
$ git clone <https://github.com/ViniciusMassari/daily-diet-api.git>
# Acesse a pasta do projeto no terminal/cmd
$ cd daily-diet-api

# Instale as dependências
$ pnpm install

# Execute a aplicação em modo de desenvolvimento
$ pnpm run start:dev

# Inicie o Docker
$ docker compose up -d

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Fastify](https://fastify.dev)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io)
- [Zod](https://zod.dev)
- [Vitest](https://vitest.dev)

### Testes
```bash 
# para rodar os testes E2E (Após subir o container docker)
$ pnpm run test:e2e

# para rodar os testes unitários
$ pnpm run test
```
### Autor
---

<p href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/108671484?v=4" width="100px;" alt=""/>
 <br />
</p>

Feito com ❤️ por Vinícius Massari 👋🏽 Entre em contato!

 [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/viniciusmassari/) 
[![Outlook](https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)](mailto:ViniMassari123@hotmail.com)