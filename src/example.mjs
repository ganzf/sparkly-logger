import chalk from 'chalk';
import Logger from './Logger.mjs';
import LEVELS from './Levels.mjs';

const log = Logger.getLogger('MainProcess').useChalk(chalk).setColor(chalk.green);

log.debug('Oh hi mark !');
log.info('Hello World');
log.warn('Try running this examp... well obviously you\'re doing it right now. Cheers !');
log.error('Goodbye All :)');
log.setLevel(LEVELS.Debug);
log.debug('Oh hi mark !');

for (let i = 0; i < 5; i += 1) {
  log.info('I dislike for loops and irony.');
}

log.fatal('I dislike for loops and irony.');

const object = {
  a: 1,
  b: 'string',
  c: [1, 2, 3],
  d: {},
};

log.info('Finally...', object);
