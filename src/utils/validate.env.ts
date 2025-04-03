import { bool, cleanEnv, port, str } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        LOG_FORMAT: str(),
        LOG_DIR: str(),
        ORIGIN: str(),
        CREDENTIALS: bool(),
        MONGOURI: str()
    });
}

export default validateEnv;
