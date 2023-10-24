import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../../styles/home.module.scss";

export default class ShowHospital extends Component {
  //Massive performance improvement by only rerendering if the hospital will actually be hidden
  shouldComponentUpdate(nextProps) {
    // Rendering the component only if
    // passed props value is changed

    //only rerender if the hospital changes, or if the component should be hidden.
    if (
      nextProps.hospital !== this.props.hospital ||
      (this.props.hospital.emergency_services === false &&
        nextProps.hideValue !== this.props.hideValue)
    ) {
      return true;
    } else {
      return false;
    }
  }

  //render the component
  render() {
    const hospital = this.props.hospital;
    //console.log(hospital);
    //console.log(props)

    //console.log("render")
    return (
      <>
        {this.props.hideValue &&
        this.props.hospital.emergency_services === false ? (
          <></>
        ) : (
          <div>
            {/* Wrap the hospitals in an acordion so it can be easier to look through */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={hospital.provider_id}
              >
                <Typography>{hospital.hospital_name}</Typography>
              </AccordionSummary>
              {/* Inside the Accordion */}
              <AccordionDetails>
                <>
                  <h1>{hospital.hospital_name}</h1>
                  <Typography>
                    Provider id: {hospital.provider_id || "Not provided"}
                    <br />
                    Address: {hospital.address || "Not provided"}
                    <br />
                    City: {hospital.city || "Not provided"}
                    <br />
                    State: {hospital.state || "Not provided"}
                    <br />
                    Zip code: {hospital.zip_code || "Not provided"}
                    <br />
                    County name: {hospital.county_name || "Not provided"}
                    <br />
                    Phone number: {hospital.phone_number || "Not provided"}
                    <br />
                    Hospital type: {hospital.hospital_type || "Not provided"}
                    <br />
                    Hospital ownership:{" "}
                    {hospital.hospital_ownership || "Not provided"}
                    <br />
                    Has emergency services:{" "}
                    {hospital.emergency_services ? "Yes" : "No"}
                    <br />
                    {/* Google maps api takes gps cords and opens the map in a new tab */}
                    {hospital.latitude && hospital.longitude && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
                        className={styles.normalLink}
                      >
                        View on Google Maps
                      </a>
                    )}
                  </Typography>
                </>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </>
    );
  }
}
