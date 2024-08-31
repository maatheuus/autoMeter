# Auto-Meter

Auto-Meter é uma aplicação que visa validar e corrigir valores lidos para faturas de água. Este projeto foi desenvolvido como parte de um teste técnico e inclui um back-end em Node.js com TypeScript, um front-end em React e é completamente dockerizado.

## Tecnologias Utilizadas

- **Back-end**: Node.js, TypeScript
- **Front-end**: React, Vite, Tailwind CSS
- **Banco de Dados**: MongoDB
- **Containerização**: Docker, Docker Compose

## Estrutura do Projeto

- **Back-end**:

  - Localizado na pasta `backend`.
  - Contém o código do servidor Node.js, incluindo endpoints para processamento e validação de dados.

- **Front-end**:

  - Localizado na pasta `frontend`.
  - Contém a aplicação React com Vite e Tailwind CSS para a interface do usuário.

- **Docker**:
  - O projeto utiliza Docker para criar contêineres para o back-end, front-end e MongoDB.
  - `docker-compose.yml` configura os serviços necessários para executar a aplicação.

## Como Rodar o Projeto

### Requisitos

- Docker
- Docker Compose

### Passos

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd auto-meter

   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd auto-meter

   ```

3. Construa e inicie os contêineres:

   ```bash
   docker-compose up --build

   ```

4. A aplicação estará disponível em http://localhost:3000 para o front-end e a API estará disponível em http://localhost:5000.
