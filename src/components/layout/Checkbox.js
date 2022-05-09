import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <p className="pb-1 text">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      <span className="pl-2">{label}</span>
    </label>
  </p>
);

export default Checkbox;
