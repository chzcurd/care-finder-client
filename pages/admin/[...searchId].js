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
                  name={isRequired ? "provider_id" : "id"}
                  {...register(isRequired ? "provider_id" : "id", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>hospital_name:</label>
                <input
                  name={isRequired ? "hospital_name" : "name"}
                  {...register(isRequired ? "hospital_name" : "name", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>address:</label>
                <input
                  name="address"
                  {...register("address", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>city:</label>
                <input
                  name="city"
                  {...register("city", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>state:</label>
                <input
                  name="state"
                  {...register("state", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>zip_code:</label>
                <input
                  name={isRequired ? "zip_code" : "zipcode"}
                  type="number"
                  {...register(isRequired ? "zip_code" : "zipcode", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>county_name:</label>
                <input
                  name={isRequired ? "county_name" : "county"}
                  {...register(isRequired ? "county_name" : "county", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>hospital_type:</label>
                <input
                  name={isRequired ? "hospital_type" : "type"}
                  {...register(isRequired ? "hospital_type" : "type", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>hospital_ownership:</label>
                <input
                  name={isRequired ? "hospital_ownership" : "ownership"}
                  {...register(
                    isRequired ? "hospital_ownership" : "ownership",
                    {
                      required: isRequired,
                    }
                  )}
                />
              </div>
              {searchType === "delete" ? (
                //delete form
                <>
                  <label>emergency_services:</label>
                  <label htmlFor="em-true">
                    <input
                      {...register("emergency_services")}
                      type="radio"
                      value={true}
                      id="emfield-true"
                    />
                    true
                  </label>
                  <label htmlFor="em-false">
                    <input
                      {...register("emergency_services")}
                      type="radio"
                      value={false}
                      id="emfield-false"
                    />
                    false
                  </label>
                  <label htmlFor="em-none">
                    <input
                      {...register("emergency_services")}
                      type="radio"
                      value=""
                      id="emfield-false"
                    />
                    none
                  </label>
                </>
              ) : (
                //Normal form
                <div>
                  <label>emergency_services:</label>
                  <input
                    name="emergency_services"
                    type="checkbox"
                    {...register("emergency_services", {
                      required: isRequired,
                    })}
                  />
                </div>
              )}
              <div>
                <label>phone_number:</label>
                <input
                  name={isRequired ? "phone_number" : "phone"}
                  type="tel"
                  {...register(isRequired ? "phone_number" : "phone", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>latitude:</label>
                <input
                  name="latitude"
                  type="number"
                  {...register("latitude", {
                    required: isRequired,
                  })}
                />
              </div>
              <div>
                <label>longitude:</label>
                <input
                  name="longitude"
                  type="number"
                  {...register("longitude", {
                    required: isRequired,
                  })}
                />
              </div>
              {searchType === "delete" && (
                <div>
                  <label>dist from cords (mi):</label>
                  <input
                    name="dist"
                    type="number"
                    {...register("dist", {
                      required: false,
                    })}
                  />
                  <br /> <br /> <br />{" "}
                </div>
              )}
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
