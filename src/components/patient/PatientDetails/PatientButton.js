import React from "react";

const PatientButton = ({
  dates,
  selectAll,
  uncheckAll,
  saveFile
}) => {
  return (
    <>
      {dates.length > 0 ? (
        <div className="text-center mb-4 p-4">
          <div>
            <button
              type="button"
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-100 bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={saveFile}
            >
              Zapisz
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-100 bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={selectAll}
            >
              Zaznacz wszystkie
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-100 bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={uncheckAll}
            >
              Odznacz wszystkie
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PatientButton;
