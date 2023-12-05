FROM node:16-alpine
WORKDIR /app
RUN apk --update add openjdk11 g++ python3 gcc
COPY . .
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]