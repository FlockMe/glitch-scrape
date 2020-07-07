const request = require('node-superfetch');
const { author, version } = require('./package.json');

const genURL = query => `https://glitch-api.herokuapp.com/api/checker?q=${query}`;

let platform = ['linux', 'windows', 'ubuntu', 'macos', 'debian'];

/**

 - Updated 7 July 2020
 - By Hanif Dwy Putra S.
 - Made with JavaScript

 * Change Log
 - Request Client

**/

module.exports = class GlitchScrape {
  constructor() {
   if (!platform.includes(process.platform)) throw Error(`We do not support the ${process.platform} platform!!`);

   this.version = version;
   this.author = author;
   this.changelog = 'Request Client for Development.';
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
 
 async status(type) {
  let resultOut;
  let paramQuery = ["incidents", "status"];
  if (typeof type !== "string") throw Error('Parameter type is empty or the value is not a string!');
  if (!paramQuery.includes(type.toLowerCase()) throw Error('See the codes available on FlockMe Repo!');
  try {
   let data = await request.get(genURL(type));
   resultOut = `==== RETRIEVED ===\nStatus: ${data.status}\nType Data: ${typeof data.body}`;
   j
  } catch (e) {
     // bypass the log error to client.
     resultOut = `Sorry:\n${e.message}`;
   }

  return resultOut;
 };
};
