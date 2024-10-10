FROM node:20-alpine3.19 as build-stage

ARG VITE_GOOGLE_REVIEW_LINK
ARG VITE_API_URL

ENV VITE_GOOGLE_REVIEW_LINK=$VITE_GOOGLE_REVIEW_LINK
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.6-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]