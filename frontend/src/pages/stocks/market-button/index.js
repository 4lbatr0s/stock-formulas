import TabButton from "../tab-button/index";

const MarketButton = ({
  title,
  secondaryTitle,
  svgIcon,
  altText,
  height,
  isActive
}) => {
  return (
    <TabButton
      title={title}
      secondaryTitle={secondaryTitle}
      altText={altText}
      svgIcon={svgIcon}
      height={height}
      padding={2}
      borderRadius={3}
      isActive={isActive}
    />
  );
};

export default MarketButton;
