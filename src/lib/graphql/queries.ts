import { graphql } from "@/generated";

export const usersQuery = graphql(`
  query Users($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
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
