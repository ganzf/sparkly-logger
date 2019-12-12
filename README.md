# Sparkly Logger

This is a small logger with a simple API that can run in the browser, console or with electron (Coming soon).

It is one tool in the sparkly suite of tools I am currently developing. 

It uses chalk for colors ouput (browser and console support). 
It also allows you to configure per-logger settings.

# Examples

```js
import Logger from '@sparkly/logger';

const log = Logger.getLogger('MainProcess')

// Output: "[MainProcess 1:50:30 PM]  Hello World"
log.info('Hello World')
// Output: "[MainProcess 1:50:30]   WARN :: Try running yarn example at the root of the repository !"  
log.warn('Try running yarn example at the root of the repository !');
// Output: "[MainProcess 1:50:30 PM]  ERROR  ::  Goodbye All :)"
log.error('Goodbye All :)')
```