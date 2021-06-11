  
FROM node:14.15.1

RUN apt-get update

ENV APP_ROOT /src

WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

RUN npm install
ENV HOST 0.0.0.0

CMD [ "npm","run","start" ]