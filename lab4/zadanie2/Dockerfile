FROM node:14

WORKDIR /usr/src/my_node_app

COPY ./package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD yarn start