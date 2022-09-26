import React from "react";

export default function ShowHospital(props) { 
    const hospital = props.hospital
    return (
        <div>
          <h2>{hospital.hospital_name}:</h2>
          <p>provider_id: {hospital.provider_id}</p>
          <p>hospital_name: {hospital.hospital_name}</p>
          <p>address: {hospital.address}</p>
          <p>city: {hospital.city}</p>
          <p>state: {hospital.state}</p>
          <p>zip_code: {hospital.zip_code}</p>
          <p>county_name: {hospital.county_name}</p>
          <p>phone_number: {hospital.phone_number}</p>
          <p>hospital_type: {hospital.hospital_type}</p>
          <p>hospital_ownership: {hospital.hospital_ownership}</p>
          <p>
            emergency_services: {hospital.emergency_services.toString()}
          </p>
          <p>human_address: {hospital.human_address}</p>
          <p>latitude: {hospital.latitude}</p>
          <p>longitude: {hospital.longitude}</p>
        </div>
      );
}