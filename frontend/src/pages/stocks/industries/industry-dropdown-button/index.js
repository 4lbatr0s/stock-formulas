import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const IndustryDropdownButton = ({ ...props }) => {
  const theme = useTheme();

  // Define the dynamic button styles by spreading the props
  const buttonStyles = {
    borderRadius: props.borderRadius || 3,
    p: props.padding || 2,
    width: props.width || 'auto',
    height: props.height || 'auto',
    maxWidth: props.maxWidth || 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace:'break-spaces',
    backgroundColor: props.backgroundColor || theme.palette.primary.lighter,
    transition: props.transition || 'background-color 0.3s, transform 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: props.hoverColor || theme.palette.primary[200],
    }
  };

  // Custom styles for the MenuItem
  const menuItemStyles = {
    '&:hover': {
      backgroundColor: 'transparent' // Remove the transparent box when hovering
    },
    margin:'0'
  };

  // Custom styles for the text inside the Select
  const selectTextStyles = {
    fontSize: 'small', // Adjust the font size as needed
  };

  return (
    <FormControl fullWidth>
      <InputLabel  id="industry-select-label">Select Industry</InputLabel>
      <Select
        labelId="industry-select-label"
        id="industry-select"
        value={props.selectedValue}
        onChange={props.onChange}
        sx={buttonStyles} // Apply your button styles to the Select component
        renderValue={(selected) => (
          <ListItemButton divider sx={menuItemStyles}>
            <ListItemAvatar sx={{margin:0, padding:0}}>
              <img
                src={selected.icon} // Use the selected item's icon
                alt={selected.altText}
                width={props.iconWidth || 24}
                height={props.iconHeight || 24}
              />
            </ListItemAvatar>
            <ListItemText
              sx={{fontSize:'12px'}} // Apply text styles
              primary={<Typography variant="button">{selected.title}</Typography>}
              secondary={selected.secondaryTitle}
            />
          </ListItemButton>
        )}
      >
        {props.options.map((option) => (
          <MenuItem sx={{ ...menuItemStyles, ...selectTextStyles }} key={option.id} value={option}>
            <ListItemAvatar>
              <img
                src={option.icon} // Use the icon from each option
                alt={option.altText}
                width={props.iconWidth || 24}
                height={props.iconHeight || 24}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="button">{option.title}</Typography>}
              secondary={option.secondaryTitle}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default IndustryDropdownButton;
