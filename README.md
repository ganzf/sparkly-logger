# Sparkly-Index

This is a small logger with a simple API that can run in the browser, console or with electron (Coming soon).

It is one tool in the sparkly suite of tools I am currently developing. 

It uses chalk for colors ouput (browser and console support). 
It also allows you to configure per-logger settings.

# Examples

```js
import Index from 'sparkly-logger';

const log = Index.getLogger('MainProcess')

// Output: "[MainProcess 1:50:26 PM]  Hello World"
log.info('Hello World')
// Output: "[MainProcess 1:51:34 PM]  ERROR  ::  Goodbye All :)"
log.error('Goodbye All :)')
```