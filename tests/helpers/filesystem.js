import * as fs from 'fs';
import * as parse from 'csv-parse';
import { finished } from 'stream/promises';

const isFileExists = (fileName) => fs.existsSync(fileName);

const readCSV = async (fileName) => {
  let csvData = [];
  const parser = fs.createReadStream(fileName).pipe(parse.parse({ delimiter: ',', columns: true }));
  parser.on('readable', () => {
    let record;
    while ((record = parser.read()) !== null) {
      csvData.push(record);
    }
  });
  await finished(parser);
  return csvData;
};

const deleteFileIfExists = (fileName) => {
  if (!isFileExists(fileName)) {
    return;
  }
  fs.unlinkSync(fileName);
};

export { isFileExists, readCSV, deleteFileIfExists };
