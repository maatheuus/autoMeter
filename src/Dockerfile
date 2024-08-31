# Use a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json (ou yarn.lock) para dentro do container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte para o container
COPY . .

# Compila o código (se necessário)
RUN npm run build

# Exponha a porta que o frontend vai rodar
EXPOSE 5174

# Define o comando para rodar o servidor
CMD ["pnpm", "dev"]
