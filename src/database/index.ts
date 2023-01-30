import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    migrations: [
        "./src/database/migrations/*.ts"
    ],
});

AppDataSource.initialize().then(() => {
    console.log('data source inicializado!')
}).catch((err) => {
    console.log(err)
})