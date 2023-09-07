import React from 'react';
import { ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TabButton = ({ ...props }) => {
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
    backgroundColor: props.backgroundColor || theme.palette.primary.lighter,
    transition: props.transition || 'background-color 0.3s, transform 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: props.hoverColor || theme.palette.primary[200],
      transform: props.scaleOnHover || 'scale(1.1)' // Apply scale transformation if specified
    }
  };

  return (
    <ListItemButton divider sx={buttonStyles}>
      <ListItemAvatar>
        <img
          src={props.svgIcon} // Replace with the actual path to your SVG file
          alt={props.altText}
          width={props.iconWidth || 24}
          height={props.iconHeight || 24}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          width: '100%', // Occupy 100% of the parent's width
          height: '100%', // Occupy 100% of the parent's height
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        primary={<Typography  variant="button">{props.title}</Typography>}
        secondary={props.secondaryTitle}
      />
    </ListItemButton>
  );
};

export default TabButton;
