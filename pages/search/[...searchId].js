import Image from "next/image";
import { useEffect, useState } from "react";
import { getHospitalsByRoute, getKey } from "../../helpers/apiClient";
import ShowHospital from "../../components/hospitalDisplays/ShowHospital";
import styles from "../../styles/home.module.scss";
import {
  CircularProgress,
  Grid,
  LinearProgress,
  Checkbox,
} from "@mui/material";
import SearchLinks from "../../components/links/Links";
import Link from "next/link";
import { blue } from "@mui/material/colors";
import Header from "../../components/header/head";
import { StyledTextField } from "../../styles/muiStyle";

//Valid routes for searches. Is also used for checking the valid parameter length for each route
const routeLengthMap = {
  all: 0,
  id: 2,
  city: 2,
  state: 2,
  county: 2,
  citystate: 3,
  name: 2,
};

// main page
export default function Home(props) {
  //api key
  const [token, setToken] = useState(null);
  //Array containing all hospitals from api
  const [hospitals, setHospitals] = useState(null);
  //Number of hospitals that have Emergency Services
  const [hospitalsWithER, setHospitalsWithER] = useState(0);
  //Controls loading spinners being shown
  const [isLoading, setIsLoading] = useState(false);
  //input from text field 1
  const [search1, setSearch1] = useState(null);
  //input from text field 2
  const [search2, setSearch2] = useState(null);
  //input to pass into api
  const [search, setSearch] = useState(null);
  //Toggle used to filter non-Emergency Services hospitals
  const [hasER, setHasER] = useState(false);

  //Search Type
  const searchType = props.searchId[0];

  const search1Label =
    searchType === "citystate"
      ? "State"
      : searchType.charAt(0).toUpperCase() + searchType.slice(1);

  //Search code, set the api method depending on the route that is chosen
  useEffect(() => {
    switch (searchType) {
      //no path
      case "all":
        console.log("all");
        setSearch("all");
        break;

      //id
      case "id":
        console.log("id");
        if (search1 != null && search1.length > 0) {
          setSearch(search1);
        }
        break;

      //city
      case "city":
        console.log("city");
        if (search1 != null && search1.length > 0) {
          setSearch(search1);
        }
        break;

      //state
      case "state":
        console.log("state");
        if (search1 != null && search1.length === 2) {
          setSearch(search1);
        }
        break;

      //county
      case "county":
        if (search1 != null && search1.length > 0) {
          setSearch(search1);
        }
        break;

      //citystate
      case "citystate":
        if (
          search1 != null &&
          search2 != null &&
          search1.length === 2 &&
          search2.length > 0
        ) {
          setSearch(search1 + "/" + search2);
        }
        break;

      //name
      case "name":
        console.log("name");
        if (search1 != null && search1.length > 0) {
          setSearch(search1);
        }
        break;
    }
  }, [search1, search2, searchType]);

  //Fetch the api key that is needed
  useEffect(() => {
    async function fetchData() {
      const key = await getKey();
      setToken(key);
    }
    fetchData();
  }, []);

  //fetch hospital data
  useEffect(() => {
    async function fetchData() {
      console.log(search);
      console.log(searchType);
      console.log(token);
      if (token != null && search != null) {
        setIsLoading(true);
        const hospitals = await getHospitalsByRoute(searchType, search, token);
        console.log(hospitals);
        if (hospitals != null) {
          let hospitalsER = 0;
          hospitals.map((hospital, index) => {
            //hospital itself
            //hospitalComponents.push(hospitalComp);
            if (hospital.emergency_services === true) {
              hospitalsER++;
            }
          });

          setHospitals(hospitals);
          setHospitalsWithER(hospitalsER);
        } else {
          setHospitals([]);
          setHospitalsWithER(0);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, [search, searchType, token]);

  //Render the page
  return (
    <div className={styles.container}>
      {/* Set the header to contain the search type */}
      <Header title={`Care Finder | Search by ${searchType}`} />

      <main className={styles.main}>
        {/* Add in the image and carefinder with a link to the homepage */}
        <div
          style={{
            position: "relative",
            height: "10%",
            width: "10%",
            paddingBottom: "10%",
          }}
        >
          <Link href={"/"} as={`/`}>
            <a>
              <Image
                alt="Care Finder Logo"
                src={"/medLogo.png"}
                layout="fill"
                objectFit="contain"
              ></Image>
            </a>
          </Link>
        </div>
        <h1 className={styles.title}>
          <Link href={"/"} as={`/`}>
            Welcome to Care Finder
          </Link>
        </h1>

        {/* Valid links to search by, pass in current page so it is hidden from the links */}
        <SearchLinks currentVal={searchType} />

        {/* Wait for the API key to be returned from the backend */}
        {!token && <CircularProgress />}

        {/* Key is good, show seach options */}
        {token && (
          <div className={`${styles.aic} ${styles.tac}`}>
            <h2>Search by: {searchType}</h2>
            {/* search boxes */}
            <Grid
              container
              direction={"row"}
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              {/* CityState route has 2 search options, show another textbox */}
              {searchType === "citystate" && (
                <Grid item>
                  <StyledTextField
                    id="city"
                    defaultValue=""
                    variant="outlined"
                    label="City"
                    onChange={(event) => {
                      setSearch2(event.target.value);
                    }}
                  />
                </Grid>
              )}
              {/* All routes except for all have 1 seach box, so show it and swap labels depending on the api route */}
              {searchType !== "all" && (
                <Grid item>
                  <StyledTextField
                    id={search1Label}
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => {
                      setSearch1(event.target.value);
                    }}
                    label={search1Label}
                  />
                </Grid>
              )}
              {/* Checkbox for hiding hospitals without Emergency Services */}
              <Grid item>
                <Checkbox
                  checked={hasER}
                  name="Has_ER"
                  onChange={(event) => {
                    setHasER(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "emergency-room" }}
                  //Color the box light blue
                  sx={{
                    color: blue[50],
                    "&.Mui-checked": {
                      color: blue[100],
                    },
                  }}
                />
              </Grid>
              <p>
                Only show hospitals with
                <br />
                Emergency Services
              </p>
            </Grid>

            <br />
            {/* Show loading bar when hospitals are loading from API */}
            {isLoading && <LinearProgress />}
            {/* If hospitals are found display them */}
            {hospitals && (
              <div className={styles.tac}>
                {/* Display number of hospitals found */}
                {/* Also, don't show the ":" if no hospitals are found */}
                <h1>
                  {hasER ? hospitalsWithER : hospitals.length} hospitals found
                  {hasER
                    ? hospitalsWithER !== 0
                      ? ":"
                      : ""
                    : hospitals.length !== 0
                    ? ":"
                    : ""}
                </h1>
                <br />
                {/* Map each hospital to an element */}
                {hospitals.map((hospital, index) => {
                  return (
                    <ShowHospital
                      hospital={hospital}
                      hideValue={hasER}
                      key={`ShowHospital-${hospital.provider_id}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

//On the server before page load, figure out the search route and check if it is valid
//The filename [...searchId] makes a dynamic route that matches /search/* in nextJS
export async function getServerSideProps(context) {
  //Grab the searchID from the url
  const searchId = context.params.searchId;

  //if no route found e.g. /search/, return a 404
  if (searchId.length < 1) {
    return {
      notFound: true,
    };
  }

  //Grab the search param and check if it is valid using the map
  const searchType = searchId[0];
  const validLength = routeLengthMap[searchType];

  //If the search param is valid, return the page
  if (searchType != undefined && validLength != undefined) {
    return {
      props: {
        searchId: searchId,
      },
    };
  }
  //Route is invalid, return 404
  else {
    return {
      notFound: true,
    };
  }
}
