const MarketButton = ({
  title,
  secondaryTitle,
  svgIcon,
  altText,
  height,
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
    />
  );
};

export default MarketButton;
