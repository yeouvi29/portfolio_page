import { graphql } from "../../../generated/client/gql";

export const usersQuery = graphql(`
  query User(
    $pagination: Pagination!
    $sort: Sort!
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
`);

export const weatherQuery = graphql(`
  query Weather {
    weather {
      date
      temp {
        avg {
          c
          f
        }
        max {
          c
          f
        }
        min {
          c
          f
        }
      }
      condition {
        text
        code
        icon
      }
    }
  }
`);
