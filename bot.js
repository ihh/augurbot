#!/usr/bin/env node

const Twitter = require('twitter'),
      fs = require('fs'),
      child_process = require('child_process'),
      getopt = require('node-getopt'),
      Bracery = require('bracery').Bracery,
      MersenneTwister = require('mersennetwister');

const statusGrammar = __dirname + '/status.bracery';
const corpora = __dirname + '/dariusk_corpora.json';
const corporaBirds = __dirname + '/dariusk_corpora_birds.json';

const opt = getopt.create([
  ['S' , 'status=N'    , 'print N statuses only, do not tweet or generate image'],
  ['t' , 'test'        , 'test mode: do not tweet'],
  ['s' , 'seed=N'      , 'seed random number generator'],
  ['h' , 'help'        , 'display this help message']
])              // create Getopt instance
      .bindHelp()     // bind option 'help' to default action
      .parseSystem() // parse command line

let maxStatusLen = 240  // give a bit of room

let seed = opt.options.seed
if (typeof(seed) === 'undefined') {
  seed = new Date().getTime()
  console.warn ("Random number seed: " + seed)
}

let rules = {}
const imported = JSON.parse(fs.readFileSync(corpora).toString())
imported.forEach ((entry) => { rules[entry.name] = entry.rules.map (rhs => rhs.join("")) })
const braceryEngine = new Bracery (rules)
// braceryEngine.rng = new MersenneTwister (seed)
const statusBracery = fs.readFileSync(statusGrammar).toString()
const makeStatus = () => {
  let status
  do {
    let expansion = braceryEngine.expand (statusBracery, {maxNodes:1e6})
    status = expansion.text
    status = status.replace(/^\s*/,'')
    status = status.replace(/\s*$/,'')
  } while (status.length > maxStatusLen)
  return status
}

if (opt.options.status) {
  for (let n = 0; n < opt.options.status; ++n)
    console.log(makeStatus())
  process.exit()
}
const statusText = makeStatus()

if (opt.options.test) {
  console.log(statusText)
  process.exit()
}

const client = new Twitter({
  consumer_key: '...',
  consumer_secret: '...',
  access_token_key: '...',
  access_token_secret: '...'
});

// Tweet
client.post('statuses/update', {status: statusText}, function(error, tweet, response) {

  if (error) {
    console.warn(error)
  } else {

    console.log(tweet);
    console.log(response);
  }
});
