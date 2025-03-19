# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
# Install all dependencies (including dev dependencies) needed for building
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Add nginx user if not exists and use it for better security
RUN addgroup -g 1001 -S nginx || true && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx || true

# Copy build output and nginx configuration
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Add environment variables
ENV NODE_ENV=production
ENV NGINX_ENTRYPOINT_QUIET_LOGS=1

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port and use non-root user
EXPOSE 80
USER nginx

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]