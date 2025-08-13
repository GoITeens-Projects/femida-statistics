// // CustomDropdown.js
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const CustomDropdown = ({ options, placeholder, onChange, value }) => {
  const [selectedOption, setSelectedOption] = useState(value || null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const customStyles = {
    control: provided => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '0.5vw',
      padding: '0.3vw',
      backgroundColor: 'var(--input-badword)',
      width: `${Math.min(windowWidth * 0.15, 350)}px`, // максимум 350px
      height: `${Math.min(windowWidth * 0.035, 60)}px`, // максимум 60px
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
      backgroundColor: 'var(--input-badword)',
      fontSize: `${Math.min(windowWidth * 0.008, 16)}px`
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontSize: `${Math.min(windowWidth * 0.008, 16)}px`
    }),
  };

  const handleChange = option => {
    setSelectedOption(option);
    if (onChange) onChange(option);
  };

  return (
    <div>
      <Select
        options={options}
        styles={customStyles}
        onChange={handleChange}
        placeholder={placeholder}
        value={selectedOption}
      />
    </div>
  );
};