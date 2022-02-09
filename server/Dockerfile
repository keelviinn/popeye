FROM node:16

WORKDIR /app/server

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
