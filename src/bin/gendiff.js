#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package';
import genDiff from '..';

program
  .version(version)
  .arguments('<oldConfigFilePath> <newConfigFilePath>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((oldConfigFilePath, newConfigFilePath) => (
    console.log(genDiff(oldConfigFilePath, newConfigFilePath))
  ))
  .parse(process.argv);

if (!program.args.length) program.help();
