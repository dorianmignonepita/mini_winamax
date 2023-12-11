# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
FROM node:lts

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /code

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci

# copy in our source code last, as it changes the most
COPY . /code