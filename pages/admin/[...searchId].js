import Image from "next/image";
import { useEffect, useState } from "react";
import {
  addHospital,
  replaceHospital,
  deleteHospital,
} from "../../helpers/apiClient";
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
import { useSession, signIn, signOut } from "next-auth/react";

import { useForm } from "react-hook-form";

//Valid routes for searches. Is also used for checking the valid parameter length for each route
const routeLengthMap = {
  add: true,
  replace: true,
  delete: false,
};

export default function Home(props) {
  //session
  const { data: session } = useSession();
  const [hospitals, setHospitals] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //Search Type
  const searchType = props.searchId[0];
  const isRequired = routeLengthMap[searchType];

  //Search code, set the api method depending on the route that is chosen
  useEffect(() => {}, [searchType]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log(data);
    let resp = null;
    setHasError(false);
    setIsLoading(true);

    switch (searchType) {
      //add
      case "add":
        resp = await addHospital(data, session.jwt);
        if (resp != null) {
          resp = [resp.data];
        }

        break;
      case "replace":
        resp = await replaceHospital(data.id, data, session.jwt);
        if (resp != null) {
          resp = [resp.data];
        }
        break;
      case "delete":
        resp = await deleteHospital(data, session.jwt);
        if (resp != null) {
          resp = resp.data;
        }
        break;
      default:
        console.error("invalid route", searchType);
        break;
    }
    console.log("data_back");
    console.log(resp);

    if (resp == null) {
      setHospitals(null);
      setHasError(true);
    } else {
      setHospitals(resp);
    }

    setIsLoading(false);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };

  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div>
      <h1>ADMIN COMMANDS | {searchType}</h1>
      {/* Valid links to search by, pass in current page so it is hidden from the links */}
      <SearchLinks currentVal={searchType} />
      {session?.isAdmin !== true ? (
        <div>
          <p>Please sign in as an Admin</p>
          {session && (
            <a href="#" onClick={handleSignout} className="btn-signin">
              SIGN OUT
            </a>
          )}
          {!session && (
            <a href="#" onClick={handleSignin} className="btn-signin">
              SIGN IN
            </a>
          )}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", justifyContent: "center" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {searchType === "replace" && (
                <div>
                  <label>Id to Replace:</label>
                  <input
                    name="id"
                    {...register("id", {
                      required: true,
                    })}
                  />
                  <br /> <br /> <br />{" "}
                </div>
              )}
              <div>
                <label>provider_id:</label>
                <input
                  name="provider_id"
                  {...register("provider_id", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>hospital_name:</label>
                <input
                  name="hospital_name"
                  {...register("hospital_name", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>address:</label>
                <input
                  name="address"
                  {...register("address", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>city:</label>
                <input
                  name="city"
                  {...register("city", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>state:</label>
                <input
                  name="state"
                  {...register("state", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>zip_code:</label>
                <input
                  name="zip_code"
                  {...register("zip_code", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>county_name:</label>
                <input
                  name="county_name"
                  {...register("county_name", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>hospital_type:</label>
                <input
                  name="hospital_type"
                  {...register("hospital_type", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>hospital_ownership:</label>
                <input
                  name="hospital_ownership"
                  {...register("hospital_ownership", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>emergency_services:</label>
                <input
                  name="emergency_services"
                  type="checkbox"
                  {...register("emergency_services", {
                    required: false,
                  })}
                />
              </div>
              <div>
                <label>phone_number:</label>
                <input
                  name="phone_number"
                  {...register("phone_number", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>latitude:</label>
                <input
                  name="latitude"
                  {...register("latitude", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label>longitude:</label>
                <input
                  name="longitude"
                  {...register("longitude", {
                    required: true,
                  })}
                />
              </div>
              <button type="submit">Submit</button>{" "}
            </form>
          </div>
          <div>
            {isLoading && <LinearProgress />}

            {/* Map each hospital to an element */}
            {hospitals &&
              hospitals.map((hospital, index) => {
                return (
                  <ShowHospital
                    hospital={hospital}
                    hideValue={false}
                    key={`ShowHospital-${hospital.provider_id}`}
                  />
                );
              })}
          </div>
        </>
      )}
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
