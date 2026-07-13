FROM node:24-alpine
COPY . /app
WORKDIR /app
RUN npm i && npm run build

ENV PORT=5173
CMD ["npm", "run", "start"]
EXPOSE 5173
