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

export async function getHospitalById(id, key) {
  let resp = await makeGET("/api/hospitals/id/" + id, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.xml.item;
    return itemArray;
  }
}

export async function getHospitalByCity(city, key) {
  let resp = await makeGET("/api/hospitals/city/" + city, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.xml.item;
    return itemArray;
  }
}

export async function getHospitalByState(state, key) {
  let resp = await makeGET("/api/hospitals/state/" + state, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.xml.item;
    return itemArray;
  }
}

export async function getHospitalByCounty(county, key) {
  let resp = await makeGET("/api/hospitals/county/" + county, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.xml.item;
    return itemArray;
  }
}

export async function getHospitalByCityState(city, state, key) {
  let resp = await makeGET(
    "/api/hospitals/citystate/" + state + "/" + city,
    key
  );
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.xml.item;
    return itemArray;
  }
}

export async function getHospitalByName(name, key) {
  let resp = await makeGET("/api/hospitals/name/" + name, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.xml.item;
    return itemArray;
  }
}

export async function getHospitalsByRoute(route, search, key) {
  switch (route) {
    //no path
    case null:
      console.log("no route");
      return await getAllHospitals(key);

    //id
    case "id":
      console.log("id");
      return await getHospitalById(search, key);

    //city
    case "city":
      console.log("city");
      return await getHospitalByCity(search, key);

    //state
    case "state":
      console.log("state");
      return await getHospitalByState(search, key);

    //county
    case "county":
      console.log("county");
      return await getHospitalByCounty(search, key);

    //citystate
    case "citystate":
      const cityState = search.split("/");
      console.log("citystate");
      return await getHospitalByCityState(cityState[0], cityState[1], key);

    //name
    case "name":
      console.log("name");
      return await getHospitalByName(search, key);
  }
}
