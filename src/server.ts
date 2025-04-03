import App from "@/app";
import { logger } from "@utils/logger";
import validateEnv from "@utils/validate.env";
import { PORT } from "@config/index";
const port: number = PORT ? parseInt(PORT, 10) : 5000;

validateEnv();

const app = new App(port);
try {
    app.listen();
} catch (error) {
    logger.error("Error in server file: ", error);
}
