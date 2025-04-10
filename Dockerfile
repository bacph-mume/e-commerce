
FROM node:23-alpine


WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .

# Expose port
EXPOSE 9001

# Run development server
CMD ["npm", "run", "dev"]