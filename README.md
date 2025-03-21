# Rock-Connect
Fullstack social media platform connecting music artists and fans, featuring post creation, content liking, and user networking capabilities. Built with modern technologies and containerized for easy deployment.


## Features

- User profiles and networking
- Post creation
- Content liking system
- Authentication system
- Coded exclusively with TypeScript


## Tech Stack

- Backend: NestJS + GraphQL API
- Database: PostgreSQL w/ Prisma ORM
- Caching: Redis
- Containerization: Docker
- Frontend: (undecided yet)
- Code Quality: ESLint + Prettier

## To-Do Lists

### Backend
- [x] Set up NestJS project structure
- [x] Implement GraphQL API for post/comment creation
- [x] Implement GraphQL API for user networking
- [x] Implement REST API for media upload (documented with Swagger)
- [x] Add user authentication and authorization
- [x] Add user authentication and authorization
- [x] Integrate PostgreSQL database with Prisma ORM
- [x] Implement Redis for caching
- [x] Implement data validation and sanitization for all inputs
- [ ] Implement role-based access control (RBAC) for fine-grained permissions
- [ ] Implement rate limiter
- [ ] Implement better monitoring with Winston
- [ ] Add WebSocket for real-time features
- [ ] Optimize database queries and indexes
- [ ] Add security best practices (CORS, CSRF protection, and HTTPS enforcement)
- [x] Containerize backend with Docker
 
### Frontend
- [ ] Decide on a frontend framework
- [ ] Set up project structure
- [ ] Implement user authentication flow
- [ ] Create user profile pages
- [ ] Build post creation and display components
- [ ] Add content liking functionality
- [ ] Integrate with the backend GraphQL API
- [ ] Write unit and integration tests
- [ ] Containerize frontend with Docker

### CI/CD
- [ ] Implement a CI/CD pipeline for automated testing and deployment


## How to Run the Server
1. Clone the Git repository:
```bash
   git clone https://github.com/your-username/rock-connect.git
   cd rock-connect 
```

2. Start the server using Docker Compose (make sure .env exists. You can use .env.example but remove .example first):
```bash
    docker compose up
```

3. (Optional) Seed the database with sample data:
```bash
    yarn prisma:seed
```

4. Access the GraphQL Playground at:
```bash
    http://localhost:3000/graphql
```

5. to preview database run:
```bash
    yarn prisma:studio
```

6. (Optional) Access the REST media documentation (Swagger UI) at:
```bash
    http://localhost:3000/api
```

## Notice
This is a portfolio project. If you want to use it for your own commercial project and deployment, make sure are to abide by OWASP [protocols and best practices](https://cheatsheetseries.owasp.org/index.html), as this project isn't that optimized for deployment, so use it at your own risk.
