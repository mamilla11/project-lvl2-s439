import program from 'commander';
import fs from 'fs';
import path from 'path';

const { version } = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname, '../../package.json',
    ), 'utf8',
  ),
);

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!program.args.length) program.help();
