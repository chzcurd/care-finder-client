import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
          provider_id: {hospital.provider_id}<br />
          hospital_name: {hospital.hospital_name}<br />
          address: {hospital.address}<br />
          city: {hospital.city}<br />
          state: {hospital.state}<br />
          zip_code: {hospital.zip_code}<br />
          county_name: {hospital.county_name}<br />
          phone_number: {hospital.phone_number}<br />
          hospital_type: {hospital.hospital_type}<br />
          hospital_ownership: {hospital.hospital_ownership}<br />
          emergency_services: {hospital.emergency_services.toString()}<br />
          human_address: {hospital.human_address}<br />
          latitude: {hospital.latitude}<br />
          longitude: {hospital.longitude}<br />
          </Typography>
          </>
        </AccordionDetails>
      </Accordion>
        </div>
      );
}