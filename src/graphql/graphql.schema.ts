import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type CustomerSpending {
    customerId: ID!
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: String!
  }

  type TopProduct {
    productId: ID!
    name: String!
    totalSold: Int!
  }

  type CategoryBreakdown {
    category: String!
    revenue: Float!
  }

  type SalesAnalytics {
    totalRevenue: Float!
    completedOrders: Int!
    categoryBreakdown: [CategoryBreakdown!]!
  }

  type Query {
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int!): [TopProduct]
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
  }

  type Mutation {
  placeOrder(
    customerId: ID!
    products: [OrderProductInput!]!
  ): Order
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }

  type Order {
    _id: ID!
    customerId: ID!
    products: [OrderProduct!]!
    totalAmount: Float!
    orderDate: String!
    status: String!
  }

  type OrderProduct {
    productId: ID!
    quantity: Int!
    priceAtPurchase: Float!
  }

 type OrderPagination {
  totalCount: Int!
  pageInfo: PageInfo!
  orders: [Order!]!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  currentPage: Int!
  totalPages: Int!
}

type Query {
  getCustomerOrders(
    customerId: ID!
    page: Int = 1
    limit: Int = 10
  ): OrderPagination!
}
`;

export default typeDefs;
