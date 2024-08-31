FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app


COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte para o container
COPY . .

# Compila o código (se necessário)
RUN npm run build

# Exponha a porta que o servidor vai rodar
EXPOSE 3000

# Define o comando para rodar o servidor
CMD ["pnpm", "start"]
