import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function SelectInput({ value, onChange, options, label, emptyLabel, ...rest }) {
  return (
    <div>
      <FormControl {...rest}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          placeholder='Filter by Experience'
          inputProps={{ 'aria-label': label || 'Select' }}
          IconComponent={KeyboardArrowDownIcon}
          
          sx={{
            minWidth: "140px",
            maxHeight: "40px",
            marginLeft: "auto",
            borderRadius: "8px",
            color: '#00B386',
            padding: "8px 16px", // Adjusted padding format
            border: '1px solid #00B386',
            '&.Mui-focused': { // Border color when focused
                borderColor: '#00B386',
              },
            '& .MuiSelect-icon': { // Style the icon
                color: '#00B386', // Icon color
              },
        }}
        >
          {emptyLabel && <MenuItem  value="">{emptyLabel}</MenuItem>}
          {options.map(option => (
            <MenuItem  key={option.value} value={option.value} className='text-base text-[#00B386]'>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectInput;
