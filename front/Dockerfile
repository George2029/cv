FROM node:24-alpine3.23 AS builder

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
     --mount=type=bind,source=package.json,target=package.json \
     --mount=type=bind,source=package-lock.json,target=package-lock.json \
     npm ci --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000

COPY . .
RUN npm run build

FROM nginx:stable-alpine3.24-perl as runner

COPY --from=builder /app/dist /usr/share/nginx/dist
