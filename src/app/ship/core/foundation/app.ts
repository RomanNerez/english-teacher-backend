import express, { Express } from 'express';
import { apiRoutesLoader } from '../loaders/api-routes-loader';
import { AppDataSource } from './database';

export default class App {
    
    static instance: Express | null = null

    static async init(): Promise<Express>  {
        if (App.instance !== null) return App.instance;

        const instance = express();

        instance.use(express.json());
        
        App.instance = instance;

        await apiRoutesLoader(instance);

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
