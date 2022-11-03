import { injectable } from "inversify";
import { PlanRepas } from "../types";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "tp4",
    password: "root",
    port: 5432,          
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  async getAllPlanRepas(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = 'SELECT * FROM "Planrepas";';
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getPlanRepas(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM "Planrepas" where numeroplan = ${id};`
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async putPlanRepas(planrepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values: string[] = [
      planrepas.numeroplan.toString(),
      planrepas.categorie,
      planrepas.frequence.toString(),
      planrepas.nbpersonnes.toString(),
      planrepas.nbcalories.toString(),
      planrepas.prix.toString(),
      planrepas.numerofournisseur.toString()
    ];
    const queryText: string = `INSERT INTO "Planrepas" VALUES($1,$2,$3,$4,$5,$6,$7);`;
    const res = await client.query(queryText, values);
    client.release();

    return res;
  }

  async deletePlanRepas(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `DELETE FROM "Planrepas" where numeroplan = ${id};`;
    const res = await client.query(queryText);
    client.release();

    return res;
  }
}