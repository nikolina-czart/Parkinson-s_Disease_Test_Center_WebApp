import React from "react";
import Checkbox from "../../layout/Checkbox";

const PatientDataCheckbox = ({ dates, toggleDate }) => {
  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Wybierz date</h2>
      {dates.length > 0 ? (
        <div>
          {dates.map((date) => (
            <Checkbox
              key={date.id}
              label={date.id}
              isSelected={date.checked}
              onCheckboxChange={toggleDate}
            />
          ))}
        </div>
      ) : (
        <div>Brak danych</div>
      )}
    </div>
  );
};

export default PatientDataCheckbox;
