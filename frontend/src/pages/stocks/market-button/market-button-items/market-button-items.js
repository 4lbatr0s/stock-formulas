import usaFlag from '../../../../assets/images/icons/usa-flag.svg';
import turkishFlag from '../../../../assets/images/icons/turkish-flag.svg';

// icons
const svgIcons = {
  americanFlag: usaFlag,
  turkishFlag: turkishFlag
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const markets = [
  {
    id: 'SP500',
    title: 'SP500',
    secondaryTitle: 'All S&P 500 stocks',
    icon: svgIcons.americanFlag,
    altText:'american-flag',
    queryValue:'S&P 500'
  },
  {
    id: 'BIST',
    title: 'BIST',
    secondaryTitle: 'All BIST stocks',
    icon: svgIcons.turkishFlag,
    altText:'turkish-flag',
    queryValue:'BIST ALL Shares'
  },
];

export default markets;
