import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getHospitalsByRoute, getKey } from "../../helpers/apiClient";
import ShowHospital from "../../components/hospitalDisplays/ShowHospital";
import styles from "../../styles/home.module.scss";
import {
  CircularProgress,
  Grid,
  LinearProgress,
  TextField,
  Checkbox,
} from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import SearchLinks from "../../components/links/Links";
import Link from "next/link";
import { common, blue, blueGrey } from "@mui/material/colors";
import Header from "../../components/header/head";

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
  all: 0,
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
  const [hospitalsWithER, setHospitalsWithER] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //input from text field 1
  const [search1, setSearch1] = useState(null);
  //input from text field 2
  const [search2, setSearch2] = useState(null);
  //input to pass into api
  const [search, setSearch] = useState(null);

  const [hasER, setHasER] = useState(false);

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
  }, [search1, search2]);

  useEffect(() => {
    async function fetchData() {
      const key = await getKey();
      setToken(key);

      /*(if (searchType === "all") {
        setSearch1("all");
      }*/
    }
    fetchData();
  }, []);

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
          const hospitalComponents = [];
          const hospitalsER = [];
          hospitals.map((hospital, index) => {
            //hospital itself
            const hospitalComp = (
              <ShowHospital
                hospital={hospital}
                key={`ShowHospital-${hospital.provider_id}`}
              />
            );
            hospitalComponents.push(hospitalComp);
            if (hospital.emergency_services === true) {
              hospitalsER.push(hospitalComp);
            }
          });

          setHospitals(hospitalComponents);
          setHospitalsWithER(hospitalsER);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, [search, token]);

  return (
    <div className={styles.container}>
      <Header title={`Care Finder | Search by ${searchType}`} />

      <main className={styles.main}>
        <div
          style={{
            position: "relative",
            height: "10%",
            width: "10%",
            paddingBottom: "10%",
          }}
        >
          <Image src={"/medLogo.png"} layout="fill" objectFit="contain"></Image>
        </div>
        <h1 className={styles.title}>
          <Link href={"/"} as={`/`}>
            Welcome to Care Finder
          </Link>
        </h1>
        <SearchLinks currentVal={searchType} />

        {!token && <CircularProgress />}
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
              {searchType !== "all" && (
                <Grid item>
                  <StyledTextField
                    id="state"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => {
                      setSearch1(event.target.value);
                    }}
                    label={search1Label}
                  />
                </Grid>
              )}
              <Grid item>
                <Checkbox
                  checked={hasER}
                  name="Has ER"
                  onChange={(event) => {
                    setHasER(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "emergency-room" }}
                  sx={{
                    color: blue[50],
                    "&.Mui-checked": {
                      color: blue[100],
                    },
                  }}
                />
              </Grid>
              <p>Has Emergency Services</p>
            </Grid>

            <br />
            {isLoading && <LinearProgress />}
            {hospitals && (
              <div className={styles.tac}>
                <h1>
                  {hasER ? hospitalsWithER.length : hospitals.length} hospitals
                  found:{" "}
                </h1>
                <br />
                {hasER ? hospitalsWithER : hospitals}
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

  if (searchType != undefined && validLength != undefined) {
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
