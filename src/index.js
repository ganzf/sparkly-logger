import uuid from 'uuid/v4.js';

export const LEVELS = {
  Debug: 'Debug',
  Info: 'Info',
  Warning: 'Warning',
  Error: 'Error',
};

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

  debug(...args) {
    if (this.level === LEVELS.Debug) {
      const opt = this.getOptions();
      if (opt.useConsole) {
        console.debug(`%c[${this._name} ${new Date().toLocaleTimeString()}] `, 'color: grey;', ...args);
      }
    }
  }

  info(...args) {
    if (this.level === LEVELS.Debug || LEVELS.Info) {
      const opt = this.getOptions();
      if (opt.useConsole) {
        if (this.chalk) {
          console.info(`[${this.colorFunction(this._name)} ${new Date().toLocaleTimeString()}] `, ...args);
        } else {
          console.log(`%c[${this._name} ${new Date().toLocaleTimeString()}] `, 'color: #00A4C6;', ...args);
        }
      }
    }
  }

  warn(...args) {
    if (this.level !== LEVELS.Error) {
      const opt = this.getOptions();
      if (opt.useConsole) {
        if (this.chalk) {
          console.warn(`[${this.colorFunction(this._name)} ${new Date().toLocaleTimeString()}] ` + this.chalk.yellow(' WARN ') + ' :: ', ...args);
        } else {
          console.warn(`%c[${this._name} ${new Date().toLocaleTimeString()}]`, 'color: deeporange', ...args);
        }
      }
    }
  }

  error(...args) {
    const opt = this.getOptions();
    if (opt.useConsole) {
      if (this.chalk) {
        console.error(`[${this.colorFunction(this._name)} ${new Date().toLocaleTimeString()}] ` + this.chalk.red(' ERROR ') + ' :: ', ...args);
      } else {
        console.error(`[${this._name} ${new Date().toLocaleTimeString()}] ERROR ::`, ...args);
      }
    }
  }
}

class Logger {
  // Allows inheritance to share selectors and default bindings.
  constructor() {
    this.subloggers = [];
    this.options = {
      useConsole: true,
    };
    this.main = this.getLogger('main', LEVELS.Info);
  }

  getLogger(name, level) {
    const existing = this.subloggers.find((it) => it._name === name);
    if (existing) {
      return existing;
    }
    const sub = new SubLogger(name, level, () => this.options);
    this.subloggers.push(sub);
    return sub;
  }
}

export default new Logger();
