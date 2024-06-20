import React from "react";
import PropTypes from "prop-types";

const CurrencyInput = ({
  placeholder,
  value,
  id,
  name,
  onChange,
  selectedCurrency,
  currencies,
  onCurrencyChange,
}) => {
  return (
    <div className="relative my-2 flex items-center border border-gray-300 rounded-md shadow-sm">
      <input
        type="number"
        className="block w-full px-5  py-2 sm:text-sm border-none rounded-md focus:outline-none bg-transparent border-b placeholder:text-lg appearance-none focus:ring-2 focus:ring-transparent"
        placeholder={placeholder}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <select
          className="h-full py-0 pl-2 pr-7   border-b placeholder:text-lg  text-primary-green  sm:text-sm border-none rounded-md focus:ring-2 focus:ring-transparent"
          value={selectedCurrency}
          onChange={onCurrencyChange}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

CurrencyInput.propTypes = {
  placeholder: PropTypes.string,
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};

CurrencyInput.defaultProps = {
  placeholder: "Contract Type",
  selectedCurrency: "INR",
};

export default CurrencyInput;
