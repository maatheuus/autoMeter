FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start" ]