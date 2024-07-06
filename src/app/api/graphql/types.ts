import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    users(
      pagination: Pagination
      sort: Sort
      filter: Filter
      search: Search
    ): UserSubList
    user(userName: ID!): User
  }

  input Pagination {
    limit: Int
    offset: Int
  }

  input Sort {
    item: String
    order: String
  }

  input Filter {
    membershipStatus: String
    subscriptionPlan: String
    paymentStatus: String
  }

  input Search {
    item: String
    value: String
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
