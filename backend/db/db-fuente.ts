import { DataSource, DataSourceOptions } from 'typeorm';
import { configDotenv, DotenvConfigOptions } from 'dotenv';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { Ranking } from 'src/ranking/ranking.entity';
import { Pregunta } from 'src/preguntas/preguntas.entity';
configDotenv();
export const dbt: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_host,
    port: Number(process.env.DB_port),
    username: process.env.DB_username,
    password: process.env.DB_password,
    database: process.env.DB_database,
    entities: [Usuario,Pregunta,Ranking],
    migrations: [],
    logging: false,
    synchronize: true,
};

const dbtrivia = new DataSource(dbt);

export default dbtrivia;
