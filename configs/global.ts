import * as dotenv from 'dotenv';

dotenv.config();

export interface GlobalConfig {
    env: string;
}

export const ENV = process.env.ENV || 'stage';

export const globalConfig: GlobalConfig = {
    env: ENV,
};