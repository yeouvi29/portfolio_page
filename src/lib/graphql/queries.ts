import { graphql } from "@/generated";

export const usersQuery = graphql(`
  query Users($limit: Int, $offset: Int, $sortField: String, $order: String) {
    users(
      limit: $limit
      offset: $offset
      sortField: $sortField
      order: $order
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
