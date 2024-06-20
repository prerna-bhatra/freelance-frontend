import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const MenuItemComponent = ({ icon, text, onClick }) => {
  return (
    <MenuItem onClick={onClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      {text === 'Profile' || text === 'My account' ? <Avatar sx={{ width: 32, height: 32, ml: -0.5, mr: 1 }} /> : null}
      {text}
    </MenuItem>
  );
};

export const MenuDivider = () => <Divider />;

export default MenuItemComponent;
