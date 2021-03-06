import * as fs from './lib/fs.js';

import scrapeData from './tasks/scrapeData.js';
import findFeatures from './tasks/findFeatures.js';
import findPopulations from './tasks/findPopulations.js';
import writeData from './tasks/writeData.js';

async function generate(date, options = { findFeatures: true, findPopulations: true, writeData: true }) {
  if (date) {
    process.env['SCRAPE_DATE'] = date;
  } else {
    delete process.env['SCRAPE_DATE'];
  }

  // JSON used for reporting
  const report = {
    date
  };

  const output = scrapeData({ report })
    .then(options.findFeatures && findFeatures)
    .then(options.findPopulations && findPopulations)
    .then(options.writeData && writeData);

  return output;
}

export default generate;
