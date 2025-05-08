# Rock-Connect
Fullstack social media platform connecting music artists and fans, featuring post creation, content liking, and user networking capabilities. Built with modern technologies and containerized for easy deployment.


## Features

- User profiles and networking
- Post creation
- Content liking system
- Authentication system
- Coded exclusively with TypeScript


## Tech Stack  
### Backend  
- NestJS + GraphQL  
- PostgreSQL + Prisma ORM  
- Redis (caching)
- Minio/AWS S3 (file storage)  

### Frontend  
- React + Vite + TypeScript  

### Infrastructure  
- Docker (containerization)  
- Nginx (reverse proxy & load balancer for production)  

### Dev Tools 
- ESLint + Prettier (code quality)  

## Prerequisites
- Docker and Docker Compose installed
- Node.js (for local development without Docker)
- PostgreSQL and Redis (if running without Docker)

## To-Do Lists

### Backend (finished)
- [x] Set up NestJS project structure
- [x] Implement GraphQL API for post/comment creation
- [x] Implement GraphQL API for user networking
- [x] Implement REST API for media upload (documented with Swagger)
- [x] Add user authentication and authorization
- [x] Integrate PostgreSQL database with Prisma ORM
- [x] Implement Redis for caching
- [x] Implement data validation and sanitization for all inputs
- [x] Containerize backend with Docker
- [x] Implement file upload/retrieval with s3 bucket

 
### Frontend
- [x] Set up React + Vite with TypeScript project structure
- [ ] Implement user authentication flow
- [ ] Create user profile pages
- [ ] Build post creation and display components
- [ ] Add content liking functionality
- [ ] Integrate with the backend GraphQL API
- [ ] Write unit and integration tests
- [x] Containerize frontend with Docker

### CI/CD
- [x] Dockerize the whole stack
- [ ] Implement a CI/CD pipeline for automated testing

### Development vs. Production
- **Development**: Runs frontend on `http://localhost:5173` with hot-reloading.
- **Production**: Use `docker-compose -f docker-compose.prod.yml up` (requires frontend build).
note: if you want production build, change `target` in docker-compose from `development` to `production`.

## How to Run the Server
1. Clone the Git repository:
```bash
   git clone https://github.com/your-username/rock-connect.git
   cd rock-connect 
```

2. Start the application using Docker Compose (make sure .env exists. You can use .env.example but remove .example first):
```bash
    docker compose up
```

3. Set up database volumes (if you haven't before):
```bash
    yarn prisma:migrate
```

4. (Optional) Seed the database with sample data:
```bash
    yarn prisma:seed
```

5. Access website at:
```bash
    http://localhost:5173
```

6. Access the GraphQL Playground at:
```bash
    http://localhost:3000/graphql
```

7. to preview database run:
```bash
    yarn prisma:studio
```

8. (Optional) Access the REST media documentation (Swagger UI) at:
```bash
    http://localhost:3000/api
```

## Notice
This is a portfolio project. If you want to use it for your own commercial project and deployment, make sure are to abide by OWASP [protocols and best practices](https://cheatsheetseries.owasp.org/index.html), as this project isn't that optimized for deployment, so use it at your own risk.
