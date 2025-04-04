import { customerSpendingResolver } from './customer.spending.resolver';
import { salesAnalyticsResolver } from './sales.analytics.resolver';
import { topSellingProductsResolver } from './topSelling.product.resolver';


const resolvers = [
  customerSpendingResolver,
  salesAnalyticsResolver,
  topSellingProductsResolver
];

export default resolvers;