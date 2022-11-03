import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
// import * as pg from "pg";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get('/test', (_req: Request, res: Response, _: NextFunction) => {
      res.send('foo bar');
    });

    router.get("/planrepas/:id?", (req: Request, res: Response, _: NextFunction) => {
      console.log('yo');
      if (req.params.id) this.databaseService.getPlanRepas(Number(req.params.id)).then((result: pg.QueryResult) => res.json(result));
      else this.databaseService.getAllPlanRepas().then((result: pg.QueryResult) => res.json(result));
    });

    return router;
  }
}