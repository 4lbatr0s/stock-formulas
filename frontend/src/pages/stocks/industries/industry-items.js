import aerospace from "../../../assets/images/icons/industries/aerospace.svg";
import automobile from "../../../assets/images/icons/industries/automobile.svg";
import chemicals from "../../../assets/images/icons/industries/chemicals.svg";
import communicationAndNetworking from "../../../assets/images/icons/industries/communication-and-networking.svg";
import constructionAndEngineering from "../../../assets/images/icons/industries/construction-and-engineering.svg";
import technology from "../../../assets/images/icons/industries/technology.svg";
import investmentAndBanking from "../../../assets/images/icons/industries/investment-and-banking.svg";
import all from "../../../assets/images/icons/industries/all.svg";

// icons
const svgIcons = {
  aerospace: aerospace,
  automobile: automobile,
  chemicals: chemicals,
  communicationAndNetworking: communicationAndNetworking,
  constructionAndEngineering: constructionAndEngineering,
  technology: technology,
  investmentAndBanking: investmentAndBanking,
  all:all,
};

const industries = [
  {
    id: 'All',
    title: 'All Industries',
    secondaryTitle: 'All Industries',
    icon: svgIcons.all,
    altText: 'all-industries-icon',
    query:''
  },
  {
    id: 'Aerospace',
    title: 'Aerospace',
    secondaryTitle: 'Aerospace Industry',
    icon: svgIcons.aerospace,
    altText: 'aerospace-icon',
    query:'aerospaceAndDefense'
  },
  {
    id: 'Automobile',
    title: 'Automobile',
    secondaryTitle: 'Automobile Industry',
    icon: svgIcons.automobile,
    altText: 'automobile-icon',
    query:'automobilesAndAutoParts',
  },
  {
    id: 'Chemicals',
    title: 'Chemicals',
    secondaryTitle: 'Chemicals Industry',
    icon: svgIcons.chemicals,
    altText: 'chemicals-icon',
    query:'chemicals'
  },
  {
    id: 'CommunicationAndNetworking',
    title: 'Communication & Networking',
    secondaryTitle: 'Communication & Networking Industry',
    icon: svgIcons.communicationAndNetworking,
    altText: 'communication-and-networking-icon',
    query:'communicationsAndNetworking'
  },
  {
    id: 'ConstructionAndEngineering',
    title: 'Construction & Engineering',
    secondaryTitle: 'Construction & Engineering Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'construction-and-engineering-icon',
    query:'constructionAndEngineering'
  },
  {
    id: 'Software and IT',
    title: 'Software and IT',
    secondaryTitle: 'Software Industry',
    icon: svgIcons.technology,
    altText: 'technology-icon',
    query:'softwareAndITServices'
  },
  {
    id: 'InvestmentAndBanking',
    title: 'Investment & Banking',
    secondaryTitle: 'Investment & Banking Industry',
    icon: svgIcons.investmentAndBanking,
    altText: 'investment-and-banking-icon',
    query:'investmentBankingAndInvestmentServices'
  },
];

export default industries;
