import React from "react";
import DoctorSummary from "./DoctorSummary";

const DoctorList = ({ props }) => {
  const { doctors, auth } = props;
  console.log(auth);
  console.log(doctors);
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl text-center font-extrabold tracking-tight text-indigo-600">
          Lista lekarzy:
        </h2>

        <div className="m-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {doctors &&
            doctors.map((doctor) => {
              return (
                <div key={doctor.id}>
                  <DoctorSummary doctor={doctor} />
                </div>
              );
              return "";
            })}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
