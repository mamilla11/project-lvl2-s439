import program from 'commander';
import { version } from '../../package';
import genDiff from '..';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => (
    console.log(genDiff(firstConfig, secondConfig))
  ))
  .parse(process.argv);

if (!program.args.length) program.help();
