FROM node:14.18.2
WORKDIR /usr/server/app

ARG DATABASE_URL

ADD package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npx prisma generate
RUN npx prisma migrate deploy

CMD ["npm", "start"]