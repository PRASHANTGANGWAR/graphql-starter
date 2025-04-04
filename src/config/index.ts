import { config } from 'dotenv';
config({ path: `.env` });

export const {
    PORT,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    MONGOURI
} = process.env as Record<string, string>;

