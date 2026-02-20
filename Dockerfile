# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# Production build (use /api/* so nginx in same container can proxy)
ENV VITE_AUTH_URL=/api/auth
ENV VITE_POST_URL=/api/posts
ENV VITE_FOLLOW_URL=/api/follow
ENV VITE_TIMELINE_URL=/api/timeline
ENV VITE_ADMIN_URL=/api/admin
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
