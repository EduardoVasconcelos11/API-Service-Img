# Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

# Ajusta as permissões do diretório de trabalho
RUN chown -R root:root /usr/src/app && \
    chmod -R 755 /usr/src/app

RUN npm install

EXPOSE 80

CMD ["npx", "nodemon", "src/index.ts"]
