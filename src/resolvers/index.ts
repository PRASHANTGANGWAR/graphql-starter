import { customerSpendingResolver } from './customer.spending.resolver';
import { salesAnalyticsResolver } from './sales.analytics.resolver';
import { topSellingProductsResolver } from './topSelling.product.resolver';
import { placeOrderResolver } from './order.mutation.resolver'


const resolvers = [
  customerSpendingResolver,
  salesAnalyticsResolver,
  topSellingProductsResolver,
  placeOrderResolver
];

export default resolvers;