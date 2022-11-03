FROM node:14
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install

# RUN npx prisma generate

COPY . .


CMD ["npm", "run", "start"]
