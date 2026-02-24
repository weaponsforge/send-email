FROM node:24.11.0-alpine AS base
RUN mkdir -p /opt/ && \
  apk add --no-cache curl
WORKDIR /opt/app

# Use the node image's default user
RUN chown -R node:node /opt/app
COPY package*.json ./

# Build target
FROM base AS build
RUN npm ci
COPY --chown=node:node . ./
RUN npm run transpile

# Development target profile
FROM base AS development
RUN npm ci
COPY --chown=node:node . ./
RUN mkdir /opt/app/node_modules/.vite \
  && chown -R node:node /opt/app/node_modules/.vite
USER node
EXPOSE 9229 4173 51204
CMD ["sh"]

# Proudction target profile
FROM base AS production
ENV NODE_ENV=production
COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --chown=node:node --from=build /opt/app/dist /opt/app/dist
USER node
CMD ["sh"]
