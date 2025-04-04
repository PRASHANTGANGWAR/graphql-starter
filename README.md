# Project Name  
**Description**: A GraphQL API to analyze customer spending patterns.  

## Features  
- Fetch total revenue between dates  
- Breakdown sales by category  
- Track completed orders  

## Tech Stack  
- Node.js  
- Apollo Server (GraphQL)  
- MongoDB  

## Setup  
1. Clone the repo: `git clone https://github.com/PRASHANTGANGWAR/graphql-starter`  
2. Install dependencies: `npm install`  
3. Run: `npm run dev`  
4. GraphQL running: `http://localhost:[port]/graphql`

## Usage  
```graphql

query GetCustomerSpending {
  getCustomerSpending(customerId: "63f8b3d5a7b1d7f3b0a2c5e1") {
    customerId
    totalSpent
    averageOrderValue
    lastOrderDate
  }
}

query GetTopSellingProducts {
  getTopSellingProducts(limit: 5) {
    productId
    name
    totalSold
  }
}

query GetSalesAnalytics{
  getSalesAnalytics(
    startDate: "2024-12-15T05:05:58.471+00:00"
    endDate: "2025-01-01T05:05:58.471+00:00"
  ) {
    totalRevenue
    completedOrders
    categoryBreakdown {
      category
      revenue
    }
  }
}