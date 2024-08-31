FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g pnpm && pnpm install
RUN pnpm run dev
RUN pnpm run start

COPY . /src
COPY . /backend
COPY . /*
EXPOSE 3000

CMD [ "pnpm", "start" ]