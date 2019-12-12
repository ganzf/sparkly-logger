import uuid from 'uuid/v4.js';
import LEVELS from './Levels.mjs';

class SubLogger {
  constructor(name, level = LEVELS.Info, getOptions) {
    this._name = name;
    this.level = level;
    this.id = uuid();
    // TODO?: Use level in getOptions to dynamically modify all subloggers level
    this.getOptions = getOptions;
    this.middleware = undefined;
  }

  useChalk(chalk) {
    this.chalk = chalk;
    return this;
  }

  setColor(colorFunction) {
    this.colorFunction = colorFunction;
    return this;
  }

  setLevel(level) {
    if (Object.values(LEVELS).includes(level)) {
      this.level = level;
    }
  }

  _withColoredBrackets(str, color) {
    if (this.chalk && this.chalk[color]) {
      return `${this.chalk[color]('[')}${this.chalk.default(str)}${this.chalk[color](']')}`;
    }
    return str;
  }

  debug(...args) {
    if (this.level === LEVELS.Debug) {
      const color = 'grey';
      const opt = this.getOptions();
      if (opt.useConsole) {
        if (this.chalk) {
          const prefix = `${this.colorFunction(this._name)} ${new Date().toLocaleTimeString()}`;
          console.debug(`${this._withColoredBrackets(prefix, color)} ${this.chalk[color](' DEBUG ')} :: `, ...args);
        } else {
          console.debug(`%c[${this._name} ${new Date().toLocaleTimeString()}] `, 'color: #00A4C6;', ...args);
        }
      }
    }
  }

  info(...args) {
    if (this.level === LEVELS.Debug || LEVELS.Info) {
      const opt = this.getOptions();
      if (opt.useConsole) {
        if (this.chalk) {
          console.log(`[${this.colorFunction(this._name)} ${new Date().toLocaleTimeString()}]            `, ...args);
        } else {
          console.log(`%c[${this._name} ${new Date().toLocaleTimeString()}] `, 'color: #00A4C6;', ...args);
        }
      }
    }
  }

  warn(...args) {
    if (this.level !== LEVELS.Error) {
      const color = 'yellow';
      const opt = this.getOptions();
      if (opt.useConsole) {
        if (this.chalk) {
          const prefix = `${this.colorFunction(this._name)} ${new Date().toLocaleTimeString()}`;
          console.warn(`${this._withColoredBrackets(prefix, color)} ${this.chalk[color](' WARN ')}  :: `, ...args);
        } else {
          console.warn(`%c[${this._name} ${new Date().toLocaleTimeString()}] `, 'color: #00A4C6;', ...args);
        }
      }
    }
  }

  error(...args) {
    const opt = this.getOptions();
    if (opt.useConsole) {
      const color = 'red';
      if (this.chalk) {
        const prefix = `${this.colorFunction(this._name)} ${new Date().toLocaleTimeString()}`;
        console.error(`${this._withColoredBrackets(prefix, color)} ${this.chalk[color](' ERROR ')} :: `, ...args);
      } else {
        console.error(`%c[${this._name} ${new Date().toLocaleTimeString()}] `, 'color: #00A4C6;', ...args);
      }
    }
  }

  fatal(...args) {
    const opt = this.getOptions();
    if (opt.useConsole) {
      const color = 'red';
      if (this.chalk) {
        const prefix = `${this.chalk.red(this._name)} ${new Date().toLocaleTimeString()}`;
        console.error(`[${prefix}]${this.chalk[color].bgWhiteBright('  FATAL  ')}:: `, ...args);
      } else {
        console.error(`%c[${this._name} ${new Date().toLocaleTimeString()}] `, 'color: #00A4C6;', ...args);
      }
    }
  }
}

export default SubLogger;
