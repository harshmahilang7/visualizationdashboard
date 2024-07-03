/**
 * @Author: Dastan Alam
 * @Date:   2024-07-02 10:08:35 PM   22:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2024-07-02 10:08:59 PM   22:07
 */
// frontend/src/components/FilterComponent.js
import React from 'react';

const FilterComponent = ({ options, onChange }) => {
  return (
    <select onChange={onChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default FilterComponent;
