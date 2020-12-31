# augurbot

This is a bot that makes predictions about the 2020 election, in the style of Ancient Roman [augury](https://en.wikipedia.org/wiki/Augury) ("Six starlings flying west over Georgia's 7th district spell trouble for the GOP", etc).

It includes code to tweet the predictions, but none of the Twitter authentication credentials that would be needed to attach this to a Twitter account.

Being typically overcommitted I had to drop this project.
With the 2020 election decisively won by Joe Biden and Kamala Harris, the code is now abandonware/vaporware.
I'm opening up the repo, and anyone who wishes to rip off this code or mutate the project is free to do so.

It's a simple project, using only a few pieces:

- [Node](https://nodejs.org/en/)
- [Bracery](http://github.com/ihh/bracery) - a language for random, procedural text generation from context-free grammars, inspired by Kate Compton's Tracery
- Darius Kazemi's [corpora](https://github.com/dariusk/corpora/) - a collection of themed words and phrases, useful for procgen
- the node.js [twitter](https://www.npmjs.com/package/twitter) client

# How to use

To install:

~~~~
npm install
~~~~

To generate 100 sample tweets (without posting):

~~~~
node ./bot.js -S 100
~~~~
