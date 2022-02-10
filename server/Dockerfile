FROM node:16

WORKDIR /app/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn && yarn build

COPY . .

EXPOSE 3333

CMD ["yarn", "start"]
