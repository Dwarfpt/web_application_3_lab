FROM node:18-alpine

WORKDIR /app

# Устанавливаем необходимые пакеты
RUN apk add --no-cache make gcc g++ python3

COPY package*.json ./

RUN npm install

# Устанавливаем необходимые пакеты для работы с почтой
RUN npm install nodemailer imap mailparser poplib

COPY . .

# Переменные окружения для email
#ENV EMAIL_USER="eduard.dimitriu@mail.ru"
#ENV EMAIL_PASSWORD="jN0NHnHFPmZa4yGX4ik4"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Запускаем сервер напрямую
CMD ["node", "server.js"] 