import React from "react";
import { Popover } from "@headlessui/react";
import { Plus } from "heroicons-react";

const DoctorSummary = ({ doctor }) => {
  const { doctorEmail } = doctor;
  return (
    <Popover>
      <div className="hover:opacity-75">
        <div className="flex flex-wrap justify-center ">
          <div className="rounded-full flex justify-center items-center bg-indigo-600 h-36 w-36 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <p className="text-center text-6xl sm:text-4xl font-bold text-white uppercase">
              {doctorEmail
                ? doctorEmail.length >= 4
                  ? doctorEmail[0].concat(doctorEmail[3])
                  : doctorEmail[0]
                : " "}
            </p>
          </div>
        </div>
        <div className="h-40 w-full -mt-14 sm:-mt-14 sm:h-40 sm:w-full sm:ml-0 lg:h-40 lg:w-full lg:-mt-16 lg:ml-0 bg-white rounded-md overflow-hidden ring-2 ring-indigo-600">
          <div className="mt-20 sm:mt-20 lg:mt-20 flex justify-center items-center">
            <div>
              <p className="text-center text-3xl sm:text-xl lg:text-xl font-bold text-indigo-600">
                {doctorEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default DoctorSummary;
