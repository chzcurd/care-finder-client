import { makeGET, proxyGET, proxyReq } from "./httpHelpers";

export async function getKey() {
  let key = await makeGET("/api/key/get");
  console.log(key);
  key = key.xml.key;
  let create = await makeGET("/api/key/create/" + key + "/5/5");

  if (create) {
    return key;
  }
}

export async function getAllHospitals(key) {
  let resp = await makeGET("/api/hospitals", key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.xml.item;
    return itemArray;
  }
}
