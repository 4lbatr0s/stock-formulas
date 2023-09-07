import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import { useEffect, useRef, useState } from "react";
import MDTypography from "components/MDTypography";
import Tooltip from "@mui/material/Tooltip";

function NewsInfoCard({ color, title, description, value }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <Tooltip title={description} placement="top">
      <Card
        sx={{
          width: '100%',
          marginBottom: '10px',
          cursor: 'pointer',
          backgroundColor: isClicked ? 'lightgray' : 'white',
          transition: 'background-color 0.3s',
          transform: isClicked ? 'scale(1.05)' : 'scale(1)',
        }}
        onClick={handleClick}
      >
        <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {title}
          </MDTypography>
          {description && (
            <MDTypography
              variant="body2"
              color="text"
              sx={{
                maxHeight: '60px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 3,
                '-webkit-box-orient': 'vertical',
                wordWrap: 'break-word',
              }}
            >
              {description}
            </MDTypography>
          )}
        </MDBox>
      </Card>
    </Tooltip>
  );
}

// Setting default values for the props of NewsInfoCard
NewsInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

// Typechecking props for the NewsInfoCard
NewsInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NewsInfoCard;
