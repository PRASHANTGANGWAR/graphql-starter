import express, { Application, Request, Response, NextFunction } from "express";

import DB from "@/models/index";
import connectDB from "@database/db";
import { logger } from "@utils/logger";

class App {
    private app: Application;
    private port: number;
    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private async connectToDatabase(): Promise<void> {
        await connectDB();

        try {
            // Sync indexes for all models
            await DB.Customer.syncIndexes();
            await DB.Order.syncIndexes();
            await DB.Product.syncIndexes();
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

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("=========🚀=========")
            console.log(`✅ Server running on port ${this.port}`);
        });
    }
}

export default App;
