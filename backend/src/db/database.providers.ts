import { Sequelize } from "sequelize-typescript"
import { Marcadores } from "src/map/entities/map.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(process.env.DATABASE_URL, {
                dialect: 'postgres'
            });
            sequelize.addModels([
                Marcadores
            ]);

            await sequelize.sync({force: false});

            console.log('DB Connected');

            return sequelize;
        }
    }
]