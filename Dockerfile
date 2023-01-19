FROM node:16-alpine 

# set working directory
WORKDIR src

COPY . .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# add app


ENV NODE_ENV development

EXPOSE 5173

# start app
CMD ["pnpm", "start"]