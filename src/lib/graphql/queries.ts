import { graphql } from "@/generated";

export const usersQuery = graphql(`
  query Users(
    $pagination: Pagination
    $sort: Sort
    $filter: Filter
    $search: Search
  ) {
    users(
      pagination: $pagination
      sort: $sort
      filter: $filter
      search: $search
    ) {
      users {
        userName
        name
        email
        registeredDate
        membershipStatus
        lastLogin
        subscriptionPlan
        paymentStatus
      }
      totalUsers
    }
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
`);
