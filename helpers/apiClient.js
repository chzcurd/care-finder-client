import { makeGET, makePPD, proxyGET, proxyReq } from "./httpHelpers";

/**
 * apiClient contains all functions that get/send data to/from the backend server
 * Uses httpHelpers to make the GET and POST requests
 */

// Gets an API key from the backend and makes sure it is valid

export async function loginUser(loginBody) {
  console.log("loginBody");
  console.log(loginBody);
  let resp = await makePPD("/api/auth/login", loginBody, "POST", "");
  console.log(resp);
  return resp;
}

export async function createUser(loginBody) {
  console.log("loginBody");
  console.log(loginBody);
  console.log("NEW USER");
  let resp = await makePPD("/api/auth/signup", loginBody, "POST", "");
  console.log(resp);
  return resp;
}

export async function addHospital(body, jwt) {
  let resp = await makePPD("/api/hospitals", body, "POST", jwt);
  console.log(resp);
  return resp;
}

export async function replaceHospital(origId, body, jwt) {
  let resp = await makePPD(`/api/hospitals?id=${origId}`, body, "PUT", jwt);
  console.log(resp);
  return resp;
}

export async function deleteHospital(body, jwt) {
  let resp = await makePPD("/api/hospitals", body, "DELETE", jwt);
  console.log(resp);
  return resp;
}

//Route to get all hospitals
export async function getAllHospitals(key) {
  let resp = await makeGET("/api/hospitals", key);
  if (resp == null) {
    return null;
  } else {
    console.log(resp);
    const itemArray = resp.data;
    return itemArray;
  }
}

//Route to search by id
export async function getHospitalById(id, key) {
  let resp = await makeGET("/api/hospitals?id=" + id, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.data;
    return itemArray;
  }
}

//Route to search by city
export async function getHospitalByCity(city, key) {
  let resp = await makeGET("/api/hospitals?city=" + city, key);
  console.log(resp);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.data;
    return itemArray;
  }
}

//Route to search by state
export async function getHospitalByState(state, key) {
  let resp = await makeGET("/api/hospitals?state=" + state, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.data;
    return itemArray;
  }
}

//Route to search by county
export async function getHospitalByCounty(county, key) {
  let resp = await makeGET("/api/hospitals?county=" + county, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.data;
    return itemArray;
  }
}

//Route to search by citystate
export async function getHospitalByCityState(city, state, key) {
  let resp = await makeGET(
    "/api/hospitals?state=" + state + "&city=" + city,
    key
  );
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.data;
    return itemArray;
  }
}

//Route to search by hospital name
export async function getHospitalByName(name, key) {
  let resp = await makeGET("/api/hospitals?name=" + name, key);
  if (resp == null) {
    return null;
  } else {
    const itemArray = resp.data;
    return itemArray;
  }
}

/**
 *
 * @param route Which API method to search with
 * @param search Search parameters to pass into method
 * @param key API key for backend
 * @returns
 */
export async function getHospitalsByRoute(route, search, key) {
  switch (route) {
    //no path
    case "all":
      //console.log("all");
      return await getAllHospitals(key);

    //id
    case "id":
      //console.log("id");
      return await getHospitalById(search, key);

    //city
    case "city":
      //console.log("city");
      return await getHospitalByCity(search, key);

    //state
    case "state":
      //console.log("state");
      return await getHospitalByState(search, key);

    //county
    case "county":
      //console.log("county");
      return await getHospitalByCounty(search, key);

    //citystate
    case "citystate":
      const cityState = search.split("/");
      //console.log("citystate");
      return await getHospitalByCityState(cityState[1], cityState[0], key);

    //name
    case "name":
      //console.log("name");
      return await getHospitalByName(search, key);
  }
}
