FROM mhart/alpine-node:8.9.4
ENV APP_CONFIG=../config/
RUN npm install -g pm2
WORKDIR /app
ADD . /app
RUN npm i
EXPOSE 3000
CMD pm2-docker start npm -- start