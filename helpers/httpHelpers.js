import { XMLParser } from "fast-xml-parser";

//Set the API baseURL here
const BASE_API_URL = "http://localhost:3000";

//fetches the base URL for the API
export function getUrlOrigin() {
  return BASE_API_URL;
}

// "https://www.knautzfamilywi.com/CareFinder-1.0.0/api/key/get"
/*
 * Retrieves XML or JSON data from a url
 */
export async function makeGET(url, apiKey) {
  //If relative URL, add in the API base
  if (url.startsWith("/")) {
    url = getUrlOrigin() + url;
  }

  //Grab the data
  const res = await fetch(url, {
    mode: "cors",
    headers: { jwt: apiKey },
  });

  //console.log(res);

  //Pull out the content type and decode to object
  try {
    const contentType = res.headers.get("content-type").split(";")[0];

    //If error, return null
    if (!res.ok) {
      console.error("Response not ok: ", res);
      return null;
    }

    //If XML, decode and return as object
    if (contentType === "application/xml") {
      //Decode XML
      return res.text().then((text) => {
        const xml = new XMLParser().parse(text);
        //If parsing fails return null
        if (xml?.xml == null) {
          return null;
        }
        //Pass back the parsed xml object
        return xml.xml;
      });
    }
    //Data is json, decode and pass back
    else if (contentType === "application/json") {
      return await res.json();
    }
    //Content type is not xml or json, pass back as a string
    else {
      return await res.text();
    }
  } catch (err) {
    //If anything errors, return null
    console.error("Error paring data from url: " + url, err);
    return null;
  }
}

/**
 * Makes a post request in either xml or json
 * (currently can only send xml)
 */
export async function makePOST(url, body, apiKey) {
  //TODO Support sending XML
  let contentType = "json";
  contentType = "xml";

  //Set up POST options
  const options = {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/" + contentType,
      jwt: apiKey,
    },
    mode: "cors",
  };

  //Add in baseURL if relative pathname
  if (url.startsWith("/")) {
    url = getUrlOrigin() + url;
  }

  //send POST request with data
  const res = await fetch(url, options);

  //console.log(res);

  //If error occured return null
  if (!res.ok) {
    console.error("Response not ok: ", res);
    return null;
  }

  //Grab the content type to decode XML or JSON data
  try {
    const contentType = res.headers.get("content-type").split(";")[0];

    //XML Data
    if (contentType === "application/xml") {
      //Parse XML data out and return it
      return res.text().then((text) => {
        const xml = new XMLParser().parse(text);
        //If data cannot be parsed, return null
        if (xml?.xml == null) {
          return null;
        }
        //Pass back parsed data
        return xml.xml;
      });
    }

    //JSON Data parsing
    else if (contentType === "application/json") {
      return await res.json();
    }
    //Neither XML or JSON, return as string
    else {
      return await res.text();
    }
  } catch (err) {
    //Catch any errors in parsing and return null
    console.error("Error paring data from url: " + url, err);
    return null;
  }
}
