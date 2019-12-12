import LEVELS from './Levels.mjs';
import SubLogger from './Sublogger.mjs';

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
