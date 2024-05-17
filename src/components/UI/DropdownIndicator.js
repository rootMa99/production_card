import React from 'react';
import Select from 'react-select';
import { components } from 'react-select';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div></div>
    </components.DropdownIndicator>
  );
};
export default DropdownIndicator;