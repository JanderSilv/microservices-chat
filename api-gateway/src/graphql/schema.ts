import { gql } from 'apollo-server';

const schema = gql`
  scalar Date
  type User {
    username: ID!
  }
  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    user: User!
  }
  type Mutation {
    createUser(password: String!, username: String!): User!
    createUserSession(password: String!, username: String!): UserSession!
    deleteUserSession(me: Boolean!): Boolean!
    sum(num1: Int!, num2: Int!): String
  }
  type Query {
    userSession(me: Boolean!): UserSession
    showUser(username: String!): User
  }
`;

export default schema;
