# GraphQL API with Automated Test Suite

A simple GraphQL API server built with TypeScript, Node.js, and Apollo Server, featuring comprehensive automated testing and containerization.

## Features

- GraphQL API with User queries
- In-memory data storage
- Comprehensive test suite with Jest
- TypeScript implementation
- Docker containerization
- Performance and security testing

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerization)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Start the Development Server

```bash
npm run dev
```

The GraphQL server will be available at: `http://localhost:4000/graphql`

### 4. Start the Production Server

```bash
npm start
```

## GraphQL Schema

### User Type
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}
```

### Available Queries
```graphql
type Query {
  getUser(id: ID!): User
  listUsers(limit: Int): [User!]!
}
```

## Example Queries

### Get User by ID
```graphql
query {
  getUser(id: "1") {
    id
    name
    email
    age
  }
}
```

### List All Users
```graphql
query {
  listUsers {
    id
    name
    email
    age
  }
}
```

### List Users with Limit
```graphql
query {
  listUsers(limit: 2) {
    id
    name
    email
  }
}
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage
The test suite covers:
- Valid queries returning expected data
- Invalid queries and error handling
- Performance tests (queries resolve within 100ms)
- Security tests (invalid fields return errors)
- Type validation

## Docker Usage

### Build Docker Image
```bash
npm run docker:build
```

### Run Docker Container
```bash
npm run docker:run
```

The containerized application will be available at: `http://localhost:4000/graphql`

### Manual Docker Commands
```bash
docker build -t graphql-api .
docker run -p 4000:4000 graphql-api
```

## Project Structure

```
├── src/
│   ├── server.ts       # Apollo Server setup
│   ├── schema.ts       # GraphQL schema definition
│   ├── resolvers.ts    # GraphQL resolvers
│   ├── types.ts        # TypeScript interfaces
│   └── data.ts         # In-memory user data
├── tests/
│   ├── setup.ts        # Test configuration
│   └── graphql.test.ts # Comprehensive test suite
├── Dockerfile          # Container configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── jest.config.js      # Jest test configuration
```

## Sample Data

The API includes 5 sample users:
- John Doe (ID: 1, Age: 30)
- Jane Smith (ID: 2, Age: 25)  
- Bob Johnson (ID: 3, Age: 35)
- Alice Brown (ID: 4, No age)
- Charlie Wilson (ID: 5, Age: 28)

## Development

### Available Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run dev` - Start development server with ts-node
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container

### Adding New Features
1. Update schema in `src/schema.ts`
2. Implement resolvers in `src/resolvers.ts`
3. Add TypeScript types in `src/types.ts`
4. Write tests in `tests/` directory
5. Update this README if needed
