FROM node:16.14.2
WORKDIR /usr/server/app

ADD package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npx prisma generate

CMD ["npm", "start"]