FROM node:20.12.1-alpine3.18
USER node
RUN mkdir -p /home/node/client
WORKDIR /home/node/client
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
