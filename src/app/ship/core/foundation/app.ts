import express, { Express } from 'express';
import { AppDataSource } from '@ship/core/foundation/database';
import { apiRoutesLoader } from '@ship/core/loaders/api-routes-loader';
import { errorHandlersLoader } from '@ship/core/loaders/error-handlers-loader';

export default class App {
    
    static instance: Express | null = null

    static async init(): Promise<Express>  {
        if (App.instance !== null) return App.instance;

        const instance = express();

        instance.use(express.json());
        
        App.instance = instance;

        await apiRoutesLoader(instance);
        errorHandlersLoader(instance);

        try {
            await AppDataSource.initialize()
            console.log("Data Source has been initialized!")
        } catch (error) {
            console.error("Error during Data Source initialization", error)
        }

        return instance;
    }

    static getInstance(): Express {
        if (App.instance == null) throw new Error('Express is not init!');

        return App.instance
    }
}
