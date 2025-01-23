// CustomDropdown.js
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const CustomDropdown = ({ options, placeholder, onChange, value }) => {
  const [selectedOption, setSelectedOption] = useState(value || null);

  useEffect(() => {
    setSelectedOption(value); // Оновлюємо вибір, якщо змінюється початкове значення
  }, [value]);

  const customStyles = {
    control: provided => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '5px',
      backgroundColor: 'var(--input-badword)',
      width: '251px',
      height: '47px',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
      backgroundColor: 'var(--input-badword)',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
    }),
  };

  const handleChange = option => {
    setSelectedOption(option);
    if (onChange) onChange(option); // Викликаємо зворотній виклик
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

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

CustomDropdown.defaultProps = {
  placeholder: 'Виберіть варіант',
  onChange: null,
};

export default CustomDropdown;
