import { gql } from 'apollo-server-express';
import { createTestServer } from './setup';

describe('GraphQL API Tests', () => {
  let server: any;

  beforeAll(async () => {
    server = createTestServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('Valid Queries', () => {
    test('getUser should return user by valid ID', async () => {
      const GET_USER = gql`
        query GetUser($id: ID!) {
          getUser(id: $id) {
            id
            name
            email
            age
          }
        }
      `;

      const result = await server.executeOperation({
        query: GET_USER,
        variables: { id: '1' }
      });

      expect(result.errors).toBeUndefined();
      expect(result.data?.getUser).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30
      });
    });

    test('listUsers should return all users without limit', async () => {
      const LIST_USERS = gql`
        query ListUsers {
          listUsers {
            id
            name
            email
            age
          }
        }
      `;

      const result = await server.executeOperation({
        query: LIST_USERS
      });

      expect(result.errors).toBeUndefined();
      expect(result.data?.listUsers).toHaveLength(5);
      expect(result.data?.listUsers[0]).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30
      });
    });

    test('listUsers should respect limit parameter', async () => {
      const LIST_USERS_LIMITED = gql`
        query ListUsersLimited($limit: Int) {
          listUsers(limit: $limit) {
            id
            name
            email
          }
        }
      `;

      const result = await server.executeOperation({
        query: LIST_USERS_LIMITED,
        variables: { limit: 2 }
      });

      expect(result.errors).toBeUndefined();
      expect(result.data?.listUsers).toHaveLength(2);
    });
  });

  describe('Invalid Queries and Error Handling', () => {
    test('getUser should return null for non-existent ID', async () => {
      const GET_USER = gql`
        query GetUser($id: ID!) {
          getUser(id: $id) {
            id
            name
            email
          }
        }
      `;

      const result = await server.executeOperation({
        query: GET_USER,
        variables: { id: '999' }
      });

      expect(result.errors).toBeUndefined();
      expect(result.data?.getUser).toBeNull();
    });

    test('should handle missing required arguments', async () => {
      const GET_USER_NO_ID = gql`
        query GetUser {
          getUser {
            id
            name
          }
        }
      `;

      const result = await server.executeOperation({
        query: GET_USER_NO_ID
      });

      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('Field "getUser" argument "id" of type "ID!" is required');
    });
  });

  describe('Security Tests', () => {
    test('should return error for non-existent field', async () => {
      const INVALID_FIELD_QUERY = gql`
        query InvalidField {
          getUser(id: "1") {
            id
            name
            invalidField
          }
        }
      `;

      const result = await server.executeOperation({
        query: INVALID_FIELD_QUERY
      });

      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('Cannot query field "invalidField"');
    });

    test('should validate field types', async () => {
      const INVALID_TYPE_QUERY = gql`
        query InvalidType {
          listUsers(limit: "invalid") {
            id
            name
          }
        }
      `;

      const result = await server.executeOperation({
        query: INVALID_TYPE_QUERY
      });

      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('Int cannot represent non-integer value');
    });
  });

  describe('Performance Tests', () => {
    test('getUser query should resolve within 100ms', async () => {
      const GET_USER = gql`
        query GetUser($id: ID!) {
          getUser(id: $id) {
            id
            name
            email
            age
          }
        }
      `;

      const startTime = Date.now();
      
      const result = await server.executeOperation({
        query: GET_USER,
        variables: { id: '1' }
      });

      const endTime = Date.now();
      const executionTime = endTime - startTime;

      expect(result.errors).toBeUndefined();
      expect(executionTime).toBeLessThan(100);
    });

    test('listUsers query should resolve within 100ms', async () => {
      const LIST_USERS = gql`
        query ListUsers {
          listUsers {
            id
            name
            email
            age
          }
        }
      `;

      const startTime = Date.now();
      
      const result = await server.executeOperation({
        query: LIST_USERS
      });

      const endTime = Date.now();
      const executionTime = endTime - startTime;

      expect(result.errors).toBeUndefined();
      expect(executionTime).toBeLessThan(100);
    });
  });
});
