import path from 'path';
import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import { ICommandOptions } from './cli';
import { createServer, Server, STATUS_CODES } from 'http';
import { Adapter } from './adapter';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ProduceRequest } from 'kafka-node';

const log = console.log;

/** Main application */
export class App {
  /** Port number where the service listens for clients */
  private readonly port: number;
  private readonly topic: string;
  private app: Application;
  private server: Server;
  private adapter: Adapter;

  constructor(options: ICommandOptions) {
    this.port = options.port;
    this.topic = options.produce;
    this.app = express();
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(express.json());
    this.server = createServer(this.app);
    this.adapter = new Adapter(options);
    this.initRouter();
    this.listen();
  }

  private initRouter() {
    this.app.get('/incoming', (req: Request, res: Response) => {
      res.send('Please POST your message as part of the body in JSON.');
    }).post('/incoming', (req: Request, res: Response, next: NextFunction) => {
      log(typeof req.body === 'object' ? JSON.stringify(req.body, null, 2) : req.body);
      const msg = { messages: req.body, topic: this.topic } as ProduceRequest;
      this.adapter.sendMessage(msg, (error, data) => {
          if (error) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      log(`Running server on port ${this.port}.`);
    });
  }
}
