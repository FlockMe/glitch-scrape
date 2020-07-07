const request = require('node-superfetch');
const { author, version } = require('./package.json');

const genURL = query => `https://glitch-api.herokuapp.com/api/checker?q=${query}`;

let platform = ['linux', 'windows', 'ubuntu', 'macos', 'debian'];

/**

 - Updated 7 July 2020
 - By Hanif Dwy Putra S.
 - Made with JavaScript

 * Change Log
 - Supported Platform added and some fixed bugs here.

**/

module.exports = class GlitchScrape {
  constructor() {
   if (!platform.includes(process.platform)) throw Error(`We do not support the ${process.platform} platform!!`);

   this.version = version;
   this.author = author;
   this.changelog = 'Fixed bugs.\nWe find the bug here on incident property of glitch scrape client package.\nNow you can use this!';
   this.lang = ['en', 'id'];
 }

  async status() {
    const { body: status } = await request.get(genURL('status'));
    return status;
 };

 async incident() {
    const { body: incident } = await request.get(genURL('incidents'));
    let incidentStat = incident.pastIncidentsDesc;

    if (incidentStat.investigate === [] && incidentStat.monitoring === [] && incidentStat.updated === [] && incidentStat.resolved === []) incidentStat = `Nothing reports about something incidents happen.`;
    if (incidentStat.investigate !== [] && incidentStat.monitoring !== [] && incidentStat.updated !== [] && incidentStat.resolved !== []) incidentStat = incidentStat.resolved[0];
    if (incidentStat.investigate !== [] && incidentStat.monitoring !== [] && incidentStat.updated !== [] && incidentStat.resolved === []) incidentStat = incidentStat.updated[0];
    if (incidentStat.investigate !== [] && incidentStat.monitoring !== [] && incidentStat.updated === [] && incidentStat.resolved === []) incidentStat = incidentStat.monitoring[0];
    if (incidentStat.investigate !== [] && incidentStat.monitoring === [] && incidentStat.updated === [] && incidentStat.resolved === []) incidentStat = incidentStat.investigate[0];
    
    const shortly = {
      title: incident.pastIncidentsTitle,
      description: incidentStat,
      time: incident.pastIncidentsTime[0]
     };
   return shortly;
 };
};
