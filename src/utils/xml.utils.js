import _ from "lodash";
import xml2js from "xml2js";

export const toJSON = (body, paths) => {
  return new Promise((resolve, reject) => {
    const parseString = xml2js.parseString;
    const stripNS = xml2js.processors.stripPrefix;

    const options = {
      tagNameProcessors: [stripNS],
      explicitArray: false,
    };

    parseString(body, options, function (err, result) {
      if (err) {
        return reject(err);
      }

      if (result) {
        const response = _.get(result.Envelope.Body, paths);

        if (response) {
          return resolve(response);
        } else {
          return reject("Invalid response");
        }
      }
    });
  });
};

export const toXML = (json) => {
  const builder = new xml2js.Builder({ headless: true });
  const xml = builder.buildObject(json);
  return xml;
};
