FROM node:erbium-alpine

WORKDIR /var/app
COPY ./package.json .
COPY ./server/ ./server/

COPY ./newrelic.js ./

RUN yarn install --silent --production=true
RUN rm -f .nprmc

CMD ["yarn", "start"] 