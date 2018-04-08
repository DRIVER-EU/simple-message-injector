import { ICommandOptions } from './cli';
import { ProduceRequest } from 'kafka-node';
import { TestBedAdapter, Logger, LogLevel } from 'node-test-bed-adapter';
import { ISendResponse } from 'node-test-bed-adapter/dist/lib/models/adapter-message';

const log = Logger.instance;

export class Adapter {
  private id: string;
  private adapter: TestBedAdapter;

  constructor(options: ICommandOptions) {
    this.id = options.id;
    this.adapter = new TestBedAdapter({
      kafkaHost: options.kafka,
      schemaRegistry: options.registry,
      clientId: options.id,
      fetchAllSchemas: false,
      autoRegisterSchemas: false,
      wrapUnions: 'auto',
      schemaFolder: './data/schemas',
      produce: [ options.produce ],
      logging: {
        logToConsole: LogLevel.Debug,
        logToKafka: LogLevel.Warn
      }
    });
    this.adapter.on('error', (e) => console.error(e));
    this.adapter.on('ready', () => {
      console.log(`${options.id} is connected to the test-bed.`);
      console.log(`Listening to messages...`);
    });
    this.adapter.connect();
  }

  public sendMessage(payloads = {} as ProduceRequest, cb?: (error?: string, data?: ISendResponse) => void) {
    this.adapter.send(payloads, (error, data) => {
      if (error) {
        log.error(error);
      }
      if (data) {
        log.debug(data);
      }
      if (cb) { cb(error, data); }
    });
  }
}
