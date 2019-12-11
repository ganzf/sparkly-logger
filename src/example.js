import chalk from 'chalk';
import Logger from './index';

const log = Logger.getLogger('MainProcess').useChalk(chalk).setColor(chalk.green);

const test = () => {
  log.info('Hello World');
  log.error('Goodbye All :)');
};

test();
