import TabButton from "pages/stocks/tab-button/index";

const IndustryButton = ({
  title,
  svgIcon,
  altText,
}) => {
  return (
    <TabButton
      title={title}
      altText={altText}
      svgIcon={svgIcon}
      maxWidth={150}
      padding={2}
      borderRadius={3}
      iconWidth={16}
      iconHeight={16}
    />
  );
};

export default IndustryButton;
