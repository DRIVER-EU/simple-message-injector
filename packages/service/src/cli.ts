import fs from 'fs';
import path from 'path';
import commandLineArgs from 'command-line-args';
import { OptionDefinition } from 'command-line-args';
import * as npmPackage from '../package.json';
import { App } from './app';

export interface ICommandOptions {
  /** Client ID */
  id: string;
  /** Port to use for the client */
  port: number;
  /** Topic to publish actions to */
  produce: string;
  /** Kafka host */
  kafka: string;
  /** Kafka schema registry */
  registry: string;
  /** Display help output */
  help: boolean;
}

export class CommandLineInterface {
  static optionDefinitions: OptionDefinition[] = [
    {
      name: 'help',
      alias: 'h',
      type: Boolean,
      typeLabel: '{underline Boolean}',
      description: 'Show help text.'
    },
    {
      name: 'id',
      alias: 'i',
      type: String,
      defaultValue: 'simple-message-injector',
      typeLabel: '{underline String}',
      description: 'ID for this client.'
    },
    {
      name: 'produce',
      alias: 'o',
      type: String,
      defaultValue: 'system_large_data_update',
      typeLabel: '{underline String}',
      description: 'Topic to consume messages from.'
    },
    {
      name: 'port',
      alias: 'p',
      type: Number,
      defaultValue: 8456,
      typeLabel: '{underline Number}',
      description: 'Client port'
    },
    {
      name: 'kafka',
      alias: 'k',
      type: String,
      defaultValue: 'localhost:3501',
      typeLabel: '{underline String}',
      description: 'Kafka broker url [localhost:3501].'
    },
    {
      name: 'registry',
      alias: 'r',
      type: String,
      defaultValue: 'localhost:3502',
      typeLabel: '{underline String}',
      description: 'Schema Registry url [localhost:3502].'
    }
  ];

  static sections = [
    {
      header: `${npmPackage.name.toUpperCase()}, v${npmPackage.version}`,
      content: `${npmPackage.license} license.

    ${npmPackage.description}`
    },
    {
      header: 'Options',
      optionList: CommandLineInterface.optionDefinitions
    },
    {
      header: 'Examples',
      content: [
        {
          desc: '01. Start the service at port 8456',
          example: '$ simple-message-injector-service -p 8456'
        },
        {
          desc: '02. Start the service and set the ID, Kafka broker and schema registry',
          example: '$ simple-message-injector-service -i simple-message-injector -k localhost:3501 -r localhost:3502'
        }
      ]
    }
  ];
}

const options: ICommandOptions = commandLineArgs(CommandLineInterface.optionDefinitions);

if (options.help) {
  const getUsage = require('command-line-usage');
  const usage = getUsage(CommandLineInterface.sections);
  console.log(usage);
  process.exit(0);
} else {
  options.kafka = options.kafka.replace('http://', '');
  options.registry = options.registry.replace('http://', '');
  new App(options);
}
