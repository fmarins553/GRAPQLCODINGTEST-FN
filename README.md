
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
