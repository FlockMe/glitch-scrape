# Installation

**Using NPM**

```sh
npm install glitch-scrape --save
```

**Using Yarn**

```sh
yarn add glitch-scrape
```

# Usage

**Status Check**

```js
const GlitchClient = require('glitch-scrape');
const glitch = new GlitchClient();

(async() => {
const status = await glitch.status();
return status; // return object
})();
```

**Incidents Check**

```js
const GlitchClient = require('glitch-scrape');
const glitch = new GlitchClient();

(async() => {
const incident = await glitch.incident();
return incident; // return object
})();
```

# Thanks for reading.
