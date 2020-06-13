const request = require('node-superfetch');
const { author, version } = require('./package.json');

const genURL = query => `https://glitch-api.herokuapp.com/api/checker?q=${query}`;

/**

 - Updated on Saturday, 13 June 2020
 - By Hanif Dwy Putra S.
 - Made with JavaScript

**/

module.exports = class GlitchScrape {
  constructor() {
   this.version = version;
   this.author = author;
 }
  async status() {
    const { body: status } = await request.get(genURL('status'));
    return status;
 };

 async incidents() {
    const { body: incident } = await request.get(genURL('incidents'));
    let incidentStat = incident.pastIncidentDesc;

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
