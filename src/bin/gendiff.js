#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package';
import genDiff from '..';

program
  .version(version)
  .arguments('<oldConfigFile> <newConfigFile>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((oldConfigFile, newConfigFile) => (
    console.log(genDiff(oldConfigFile, newConfigFile))
  ))
  .parse(process.argv);

if (!program.args.length) program.help();
