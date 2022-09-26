import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { makeGET, proxyGET, proxyReq } from "../../helpers/httpHelpers";
import {
  getAllHospitals,
  getHospitalsByRoute,
  getKey,
} from "../../helpers/apiClient";
import ShowHospital from "../../components/hospitalDisplays/ShowHospital";
import styles from "../../styles/home.module.scss";
import { CircularProgress, TextField, withTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "lightBlue",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "lightBlue",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "lightBlue",
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: "white",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "white",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "lightBlue",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "white",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "white",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "lightBlue",
  },
});

const routeLengthMap = {
  id: 2,
  city: 2,
  state: 2,
  county: 2,
  citystate: 3,
  name: 2,
};

export default function Home(props) {
  const [token, setToken] = useState(null);
  const [hospitals, setHospitals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //input from text field 1
  const [search1, setSearch1] = useState(null);
  //input from text field 2
  const [search2, setSearch2] = useState(null);
  //input to pass into api
  const [search, setSearch] = useState(null);

  //Search Type
  const searchType = props.searchId[0];

  const search1Label =
    searchType === "citystate"
      ? "State"
      : searchType.charAt(0).toUpperCase() + searchType.slice(1);

  //Search code
  useEffect(() => {
    switch (searchType) {
      //no path
      case null:
        console.log("no route");
        setSearch("notneeded");
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
  }, [search1, search2]);

  useEffect(() => {
    async function fetchData() {
      const key = await getKey();
      setToken(key);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(search);
      console.log(searchType);
      if (token != null) {
        const hospitals = await getHospitalsByRoute(searchType, search, token);
        if (hospitals != null) {
          setHospitals(hospitals);
        }
      }
    }
    fetchData();
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Care Finder</title>
        <meta name="description" content="Care Finder client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Care Finder</h1>

        {!token && <CircularProgress />}
        {token && (
          <div>
            <h2>Search by: {searchType}</h2>
            {/* search boxes */}
            <div /*style={{ background: "white" }}*/>
              {searchType === "citystate" && (
                <StyledTextField
                  id="city"
                  defaultValue="My Default Value"
                  variant="outlined"
                  label="City"
                  onChange={(event) => {
                    setSearch2(event.target.value);
                  }}
                />
              )}
              <StyledTextField
                id="state"
                defaultValue="My Default Value"
                variant="outlined"
                onChange={(event) => {
                  setSearch1(event.target.value);
                }}
                label={search1Label}
              />
            </div>

            {hospitals && (
              <div className={styles.tac}>
                <h1>Hospitals: </h1>
                {hospitals.map((hospital) => (
                  <ShowHospital hospital={hospital} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const searchId = context.params.searchId;

  if (searchId.length < 1) {
    return {
      notFound: true,
    };
  }
  const searchType = searchId[0];

  const validLength = routeLengthMap[searchType];

  if (searchType != undefined) {
    return {
      props: {
        searchId: searchId,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }

  // Rest of `getServerSideProps` code
}
