import { customerSpendingResolver } from './customer.spending.resolver';
import { salesAnalyticsResolver } from './sales.analytics.resolver';
import { topSellingProductsResolver } from './topSelling.product.resolver';
import { placeOrderResolver } from './order.mutation.resolver';
import { customerOrdersResolver } from './get.customer.order.resolver'


const resolvers = [
  customerSpendingResolver,
  salesAnalyticsResolver,
  topSellingProductsResolver,
  placeOrderResolver,
  customerOrdersResolver
];

export default resolvers;