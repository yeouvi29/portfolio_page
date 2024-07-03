import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    users(
      limit: Int
      offset: Int
      sortField: String
      order: String
    ): UserSubList
    user(userName: ID!): User
  }

  type UserSubList {
    users: [User!]!
    totalUsers: Int!
  }

  type User {
    userName: ID!
    name: String!
    email: String!
    registeredDate: String!
    membershipStatus: String!
    lastLogin: String!
    subscriptionPlan: String!
    paymentStatus: String!
  }
`;
