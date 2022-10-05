import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

const BASE_API_URL = "https://www.knautzfamilywi.com/CareFinder-1.0.0";

export function getUrlOrigin() {
  return BASE_API_URL;
  /*if (typeof window !== "undefined") {
    return window.location.origin;
  } else {
    console.error("window undefined! could not get hostname");
    return "";
  }*/
}

// "https://www.knautzfamilywi.com/CareFinder-1.0.0/api/key/get"
/*
 * Retrieves XML or JSON data from a url
 */
export async function makeGET(url, apiKey) {
  if (url.startsWith("/")) {
    url = getUrlOrigin() + url;
  }
  //const urlOrigin = getUrlOrigin()

  const res = await fetch(url, {
    mode: "cors",
    headers: { "x-api-key": apiKey },
  });

  console.log(res);

  try {
    const contentType = res.headers.get("content-type").split(";")[0];

    if (!res.ok) {
      console.error("Response not ok: ", res);
      return null;
    }

    if (contentType === "application/xml") {
      return res.text().then((text) => {
        const xml = new XMLParser().parse(text);
        if (xml.xml == null) {
          return null;
        }
        return xml.xml;
      });
    } else if (contentType === "application/json") {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (err) {
    console.error("Error paring data from url: " + url, err);
    return null;
  }
}

export async function makePOST(url, body, key) {
  let contentType = "json";
  contentType = "xml";
  const options = {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/" + contentType,
      "x-api-key": apiKey,
    },
    mode: "cors",
  };

  if (url.startsWith("/")) {
    url = getUrlOrigin() + url;
  }

  const res = await fetch(url, options);

  console.log(res);

  if (!res.ok) {
    console.error("Response not ok: ", res);
    return null;
  }

  try {
    const contentType = res.headers.get("content-type").split(";")[0];

    if (contentType === "application/xml") {
      return res.text().then((text) => {
        const xml = new XMLParser().parse(text);
        if (xml.xml == null) {
          return null;
        }
        return xml.xml;
      });
    } else if (contentType === "application/json") {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (err) {
    console.error("Error paring data from url: " + url, err);
    return null;
  }
}

export async function proxyPOST(url, body) {
  return await makeGET(
    "http://localhost:3000/api/proxypost?url=" + url + "&body=" + body
  );
}
