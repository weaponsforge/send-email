FROM node:22.14.0-alpine AS base
RUN mkdir -p /opt/ && \
  apk add --no-cache curl
WORKDIR /opt/app

# Use the node image's default user
RUN chown -R node:node /opt/app
COPY package*.json ./

# Build target
FROM base AS build
RUN npm install
COPY . ./
RUN npm run transpile

# Development target profile
FROM base AS development
RUN npm install
COPY . ./
RUN mkdir /opt/app/node_modules/.vite \
  && chown -R node:node /opt/app/node_modules/.vite
USER node
EXPOSE 9229 4173 51204
CMD ["sh"]

# Proudction target profile
FROM base AS production
ENV NODE_ENV=production
COPY --from=build /opt/app/dist /opt/app/dist
COPY package*.json ./
USER node
CMD ["sh"]
