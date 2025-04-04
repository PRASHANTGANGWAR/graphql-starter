import express, { Application, Request, Response, NextFunction } from "express";
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import DB from "@/models/index";
import connectDB from "@database/db";
import { logger } from "@utils/logger";
import typeDefs from "@/graphql/graphql.schema";
import resolvers from "@resolvers/index";

class App {
    private app: Application;
    private port: number;
    private apolloServer: ApolloServer;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        // Create Apollo Server instance
        this.apolloServer = new ApolloServer({
            schema: makeExecutableSchema({ typeDefs, resolvers }),
            context: () => ({
                Customer: DB.Customer,
                Order: DB.Order,
                Product: DB.Product
            })
        });

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private async connectToDatabase(): Promise<void> {
        await connectDB();

        try {
            // Sync indexes for all models
            await DB.Customer.ensureIndexes();
            await DB.Order.ensureIndexes();
            await DB.Product.ensureIndexes();
            logger.info("✅ MongoDB Models Synced!");
        } catch (error) {
            logger.error("❌ Error in syncing MongoDB models:", error);
        }
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());

        // Logging middleware
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            logger.info(`[${req.method}] ${req.url}`);
            next();
        });
    }

    private initializeRoutes(): void {
        this.app.get("/", (req: Request, res: Response) => {
            res.send("MongoDB API is running 🚀");
        });
    }

    public async listen(): Promise<void> {
        // Start Apollo Server
        await this.apolloServer.start();

        // Apply Apollo middleware to Express app
        this.apolloServer.applyMiddleware({
            app: this.app as any,
            path: '/graphql'
        });

        this.app.listen(this.port, () => {
            console.log("=========🚀=========");
            console.log(`✅ Server running on port ${this.port}`);
            console.log(`✅ GraphQL server ready at http://localhost:${this.port}${this.apolloServer.graphqlPath}`);
        });
    }
}

export default App;