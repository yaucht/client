FROM node:12.18.4-buster-slim as builder

WORKDIR /app

COPY . ./

RUN yarn && yarn build

FROM nginx:1.19.2-alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]


