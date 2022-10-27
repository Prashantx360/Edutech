import React from "react";

const Input = ({ placeholder, type, value, handleInput, name }) => {
  return (
    <input
      className="form-control"
      type={type}
      name={name}
      value={value}
      onChange={handleInput}
      placeholder={placeholder}
    />
  );
};

export default Input
