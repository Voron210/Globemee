FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]