import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import styles from "../../styles/home.module.scss";


export default function ShowHospital(props) { 
    const hospital = props.hospital
    return (
        <div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={hospital.provider_id}
        >
          <Typography>{hospital.hospital_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
          <h1>{hospital.hospital_name}</h1>
          <Typography>
          Provider id: {hospital.provider_id}<br />
          Address: {hospital.address}<br />
          City: {hospital.city}<br />
          State: {hospital.state}<br />
          Zip code: {hospital.zip_code}<br />
          County name: {hospital.county_name}<br />
          Phone number: {hospital.phone_number}<br />
          Hospital type: {hospital.hospital_type}<br />
          Hospital ownership: {hospital.hospital_ownership}<br />
          Has emergency services: {hospital.emergency_services ? "Yes" : "No"}<br />
          {/*Latitude: {hospital.latitude}<br />
          Longitude: {hospital.longitude}<br />*/}
          <Link href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}><a className={styles.normalLink}>Directions on Google Maps</a></Link>
          </Typography>
          </>
        </AccordionDetails>
      </Accordion>
        </div>
      );
}