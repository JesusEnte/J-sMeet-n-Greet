FROM node:24-alpine
COPY . /app
WORKDIR /app
RUN npm i && npm run build
CMD ["npm", "run", "start"]
