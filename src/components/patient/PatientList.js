import React from "react";
import PatientSummary from "./PatientSummary";
import { Link } from "react-router-dom";

const PatientList = ({ props }) => {
  const { patients, auth } = props;
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl text-center font-extrabold tracking-tight text-indigo-600">
          Lista użytkowników
        </h2>

        <div className="m-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {patients &&
            patients.map((patient) => {
              if (patient.doctorID === auth.uid) {
                return (
                  <div key={patient.id}>
                    <Link
                      to={{
                        pathname: "/patient/" + patient.id,
                        state: patient.id,
                      }}
                    >
                      <PatientSummary patient={patient} />
                    </Link>
                  </div>
                );
              }
              return "";
            })}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
