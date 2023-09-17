import aerospace from '../../../assets/images/icons/industries/aerospace.svg';
import automobile from '../../../assets/images/icons/industries/automobile.svg';
import chemicals from '../../../assets/images/icons/industries/chemicals.svg';
import communicationAndNetworking from '../../../assets/images/icons/industries/communication-and-networking.svg';
import constructionAndEngineering from '../../../assets/images/icons/industries/construction-and-engineering.svg';
import technology from '../../../assets/images/icons/industries/technology.svg';
import investmentAndBanking from '../../../assets/images/icons/industries/investment-and-banking.svg';
import all from '../../../assets/images/icons/industries/all.svg';

// icons
const svgIcons = {
  aerospace: aerospace,
  automobile: automobile,
  chemicals: chemicals,
  communicationAndNetworking: communicationAndNetworking,
  constructionAndEngineering: constructionAndEngineering,
  technology: technology,
  investmentAndBanking: investmentAndBanking,
  all: all
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
    id: 'AerospaceAndDefense',
    title: 'Aerospace & Defense',
    secondaryTitle: 'Aerospace & Defense Industry',
    icon: svgIcons.aerospace,
    altText: 'aerospace-and-defense-icon',
    query: 'aerospaceAndDefense'
  },
  {
    id: 'AutomobilesAndAutoParts',
    title: 'Automobiles & Auto Parts',
    secondaryTitle: 'Automobiles & Auto Parts Industry',
    icon: svgIcons.automobile,
    altText: 'automobiles-and-auto-parts-icon',
    query: 'automobilesAndAutoParts'
  },
  {
    id: 'BankingServices',
    title: 'Banking Services',
    secondaryTitle: 'Banking Services Industry',
    icon: svgIcons.investmentAndBanking,
    altText: 'banking-services-icon',
    query: 'bankingServices'
  },
  {
    id: 'Beverages',
    title: 'Beverages',
    secondaryTitle: 'Beverages Industry',
    icon: svgIcons.chemicals,
    altText: 'beverages-icon',
    query: 'beverages'
  },
  {
    id: 'BiotechnologyAndMedicalResearch',
    title: 'Biotechnology & Medical Research',
    secondaryTitle: 'Biotechnology & Medical Research Industry',
    icon: svgIcons.technology,
    altText: 'biotechnology-and-medical-research-icon',
    query: 'biotechnologyAndMedicalResearch'
  },
  {
    id: 'Chemicals',
    title: 'Chemicals',
    secondaryTitle: 'Chemicals Industry',
    icon: svgIcons.chemicals,
    altText: 'chemicals-icon',
    query: 'chemicals'
  },
  {
    id: 'Coal',
    title: 'Coal',
    secondaryTitle: 'Coal Industry',
    icon: svgIcons.chemicals,
    altText: 'coal-icon',
    query: 'coal'
  },
  {
    id: 'CollectiveInvestments',
    title: 'Collective Investments',
    secondaryTitle: 'Collective Investments Industry',
    icon: svgIcons.investmentAndBanking,
    altText: 'collective-investments-icon',
    query: 'collectiveInvestments'
  },
  {
    id: 'CommunicationsAndNetworking',
    title: 'Communication & Networking',
    secondaryTitle: 'Communication & Networking Industry',
    icon: svgIcons.communicationAndNetworking,
    altText: 'communication-and-networking-icon',
    query: 'communicationsAndNetworking'
  },
  {
    id: 'ComputersPhonesAndHouseholdElectronics',
    title: 'Computers, Phones & Household Electronics',
    secondaryTitle: 'Computers, Phones & Household Electronics Industry',
    icon: svgIcons.technology,
    altText: 'computers-phones-and-household-electronics-icon',
    query: 'computersPhonesAndHouseholdElectronics'
  },
  {
    id: 'ConstructionMaterials',
    title: 'Construction Materials',
    secondaryTitle: 'Construction Materials Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'construction-materials-icon',
    query: 'constructionMaterials'
  },
  {
    id: 'ConstructionAndEngineering'
    // ...
  },
  {
    id: 'ConsumerGoodsConglomerates',
    title: 'Consumer Goods Conglomerates',
    secondaryTitle: 'Consumer Goods Conglomerates Industry',
    icon: svgIcons.automobile,
    altText: 'consumer-goods-conglomerates-icon',
    query: 'consumerGoodsConglomerates'
  },
  {
    id: 'ContainersAndPackaging',
    title: 'Containers & Packaging',
    secondaryTitle: 'Containers & Packaging Industry',
    icon: svgIcons.chemicals,
    altText: 'containers-and-packaging-icon',
    query: 'containersAndPackaging'
  },
  {
    id: 'DiversifiedIndustrialGoodsWholesale',
    title: 'Diversified Industrial Goods Wholesale',
    secondaryTitle: 'Diversified Industrial Goods Wholesale Industry',
    icon: svgIcons.automobile,
    altText: 'diversified-industrial-goods-wholesale-icon',
    query: 'diversifiedIndustrialGoodsWholesale'
  },
  {
    id: 'DiversifiedRetail',
    title: 'Diversified Retail',
    secondaryTitle: 'Diversified Retail Industry',
    icon: svgIcons.automobile,
    altText: 'diversified-retail-icon',
    query: 'diversifiedRetail'
  },
  {
    id: 'ElectricalUtilitiesAndIPPs',
    title: 'Electrical Utilities & IPPs',
    secondaryTitle: 'Electrical Utilities & IPPs Industry',
    icon: svgIcons.technology,
    altText: 'electrical-utilities-and-ipps-icon',
    query: 'electricalUtilitiesAndIPPs'
  },
  {
    id: 'ElectronicEquipmentAndParts',
    title: 'Electronic Equipment & Parts',
    secondaryTitle: 'Electronic Equipment & Parts Industry',
    icon: svgIcons.technology,
    altText: 'electronic-equipment-and-parts-icon',
    query: 'electronicEquipmentAndParts'
  },
  {
    id: 'FinancialTechnologyAndInfrastructure',
    title: 'Financial Technology (Fintech) & Infrastructure',
    secondaryTitle: 'Financial Technology (Fintech) & Infrastructure Industry',
    icon: svgIcons.technology,
    altText: 'financial-technology-and-infrastructure-icon',
    query: 'financialTechnologyAndInfrastructure'
  },
  {
    id: 'FoodAndDrugRetailing',
    title: 'Food & Drug Retailing',
    secondaryTitle: 'Food & Drug Retailing Industry',
    icon: svgIcons.automobile,
    altText: 'food-and-drug-retailing-icon',
    query: 'foodAndDrugRetailing'
  },
  {
    id: 'FoodAndTobacco',
    title: 'Food & Tobacco',
    secondaryTitle: 'Food & Tobacco Industry',
    icon: svgIcons.automobile,
    altText: 'food-and-tobacco-icon',
    query: 'foodAndTobacco'
  },
  {
    id: 'FreightAndLogisticsServices',
    title: 'Freight & Logistics Services',
    secondaryTitle: 'Freight & Logistics Services Industry',
    icon: svgIcons.automobile,
    altText: 'freight-and-logistics-services-icon',
    query: 'freightAndLogisticsServices'
  },
  {
    id: 'GovernmentActivity',
    title: 'Government Activity',
    secondaryTitle: 'Government Activity Industry',
    icon: svgIcons.aerospace,
    altText: 'government-activity-icon',
    query: 'governmentActivity'
  },
  {
    id: 'HealthcareEquipmentAndSupplies',
    title: 'Healthcare Equipment & Supplies',
    secondaryTitle: 'Healthcare Equipment & Supplies Industry',
    icon: svgIcons.technology,
    altText: 'healthcare-equipment-and-supplies-icon',
    query: 'healthcareEquipmentAndSupplies'
  },
  {
    id: 'HealthcareProvidersAndServices',
    title: 'Healthcare Providers & Services',
    secondaryTitle: 'Healthcare Providers & Services Industry',
    icon: svgIcons.technology,
    altText: 'healthcare-providers-and-services-icon',
    query: 'healthcareProvidersAndServices'
  },
  {
    id: 'HomebuildingAndConstructionSupplies',
    title: 'Homebuilding & Construction Supplies',
    secondaryTitle: 'Homebuilding & Construction Supplies Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'homebuilding-and-construction-supplies-icon',
    query: 'homebuildingAndConstructionSupplies'
  },
  {
    id: 'HotelsAndEntertainmentServices',
    title: 'Hotels & Entertainment Services',
    secondaryTitle: 'Hotels & Entertainment Services Industry',
    icon: svgIcons.automobile,
    altText: 'hotels-and-entertainment-services-icon',
    query: 'hotelsAndEntertainmentServices'
  },
  {
    id: 'HouseholdGoods',
    title: 'Household Goods',
    secondaryTitle: 'Household Goods Industry',
    icon: svgIcons.automobile,
    altText: 'household-goods-icon',
    query: 'householdGoods'
  },
  {
    id: 'InstitutionsAssociationsAndOrganizations',
    title: 'Institutions, Associations & Organizations',
    secondaryTitle: 'Institutions, Associations & Organizations Industry',
    icon: svgIcons.aerospace,
    altText: 'institutions-associations-and-organizations-icon',
    query: 'institutionsAssociationsAndOrganizations'
  },
  {
    id: 'Insurance',
    title: 'Insurance',
    secondaryTitle: 'Insurance Industry',
    icon: svgIcons.investmentAndBanking,
    altText: 'insurance-icon',
    query: 'insurance'
  },
  {
    id: 'IntegratedHardwareAndSoftware',
    title: 'Integrated Hardware & Software',
    secondaryTitle: 'Integrated Hardware & Software Industry',
    icon: svgIcons.technology,
    altText: 'integrated-hardware-and-software-icon',
    query: 'integratedHardwareAndSoftware'
  },
  {
    id: 'InvestmentBankingAndInvestmentServices',
    title: 'Investment Banking & Investment Services',
    secondaryTitle: 'Investment Banking & Investment Services Industry',
    icon: svgIcons.investmentAndBanking,
    altText: 'investment-banking-and-investment-services-icon',
    query: 'investmentBankingAndInvestmentServices'
  },
  {
    id: 'InvestmentHoldingCompanies',
    title: 'Investment Holding Companies',
    secondaryTitle: 'Investment Holding Companies Industry',
    icon: svgIcons.investmentAndBanking,
    altText: 'investment-holding-companies-icon',
    query: 'investmentHoldingCompanies'
  },
  {
    id: 'LeisureProducts',
    title: 'Leisure Products',
    secondaryTitle: 'Leisure Products Industry',
    icon: svgIcons.automobile,
    altText: 'leisure-products-icon',
    query: 'leisureProducts'
  },
  {
    id: 'MachineryToolsHeavyVehiclesTrainsAndShips',
    title: 'Machinery, Tools, Heavy Vehicles, Trains & Ships',
    secondaryTitle: 'Machinery, Tools, Heavy Vehicles, Trains & Ships Industry',
    icon: svgIcons.automobile,
    altText: 'machinery-tools-heavy-vehicles-trains-and-ships-icon',
    query: 'machineryToolsHeavyVehiclesTrainsAndShips'
  },
  {
    id: 'MediaAndPublishing',
    title: 'Media & Publishing',
    secondaryTitle: 'Media & Publishing Industry',
    icon: svgIcons.communicationAndNetworking,
    altText: 'media-and-publishing-icon',
    query: 'mediaAndPublishing'
  },
  {
    id: 'MetalsAndMining',
    title: 'Metals & Mining',
    secondaryTitle: 'Metals & Mining Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'metals-and-mining-icon',
    query: 'metalsAndMining'
  },
  {
    id: 'MiscellaneousEducationalServiceProviders',
    title: 'Miscellaneous Educational Service Providers',
    secondaryTitle: 'Miscellaneous Educational Service Providers Industry',
    icon: svgIcons.technology,
    altText: 'miscellaneous-educational-service-providers-icon',
    query: 'miscellaneousEducationalServiceProviders'
  },
  {
    id: 'MultilineUtilities',
    title: 'Multiline Utilities',
    secondaryTitle: 'Multiline Utilities Industry',
    icon: svgIcons.technology,
    altText: 'multiline-utilities-icon',
    query: 'multilineUtilities'
  },
  {
    id: 'NaturalGasUtilities',
    title: 'Natural Gas Utilities',
    secondaryTitle: 'Natural Gas Utilities Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'natural-gas-utilities-icon',
    query: 'naturalGasUtilities'
  },
  {
    id: 'OfficeEquipment',
    title: 'Office Equipment',
    secondaryTitle: 'Office Equipment Industry',
    icon: svgIcons.technology,
    altText: 'office-equipment-icon',
    query: 'officeEquipment'
  },
  {
    id: 'OilAndGas',
    title: 'Oil & Gas',
    secondaryTitle: 'Oil & Gas Industry',
    icon: svgIcons.chemicals,
    altText: 'oil-and-gas-icon',
    query: 'oilAndGas'
  },
  {
    id: 'OilAndGasRelatedEquipmentAndServices',
    title: 'Oil & Gas Related Equipment and Services',
    secondaryTitle: 'Oil & Gas Related Equipment and Services Industry',
    icon: svgIcons.chemicals,
    altText: 'oil-and-gas-related-equipment-and-services-icon',
    query: 'oilAndGasRelatedEquipmentAndServices'
  },
  {
    id: 'PaperAndForestProducts',
    title: 'Paper & Forest Products',
    secondaryTitle: 'Paper & Forest Products Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'paper-and-forest-products-icon',
    query: 'paperAndForestProducts'
  },
  {
    id: 'PassengerTransportationServices',
    title: 'Passenger Transportation Services',
    secondaryTitle: 'Passenger Transportation Services Industry',
    icon: svgIcons.automobile,
    altText: 'passenger-transportation-services-icon',
    query: 'passengerTransportationServices'
  },
  {
    id: 'PersonalAndHouseholdProductsAndServices',
    title: 'Personal & Household Products & Services',
    secondaryTitle: 'Personal & Household Products & Services Industry',
    icon: svgIcons.automobile,
    altText: 'personal-and-household-products-and-services-icon',
    query: 'personalAndHouseholdProducts&Services'
  },
  {
    id: 'Pharmaceuticals',
    title: 'Pharmaceuticals',
    secondaryTitle: 'Pharmaceuticals Industry',
    icon: svgIcons.technology,
    altText: 'pharmaceuticals-icon',
    query: 'pharmaceuticals'
  },
  {
    id: 'ProfessionalAndBusinessEducation',
    title: 'Professional & Business Education',
    secondaryTitle: 'Professional & Business Education Industry',
    icon: svgIcons.technology,
    altText: 'professional-and-business-education-icon',
    query: 'professionalAndBusinessEducation'
  },
  {
    id: 'ProfessionalAndCommercialServices',
    title: 'Professional & Commercial Services',
    secondaryTitle: 'Professional & Commercial Services Industry',
    icon: svgIcons.automobile,
    altText: 'professional-and-commercial-services-icon',
    query: 'professionalAndCommercialServices'
  },
  {
    id: 'RealEstateOperations',
    title: 'Real Estate Operations',
    secondaryTitle: 'Real Estate Operations Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'real-estate-operations-icon',
    query: 'realEstateOperations'
  },
  {
    id: 'RenewableEnergy',
    title: 'Renewable Energy',
    secondaryTitle: 'Renewable Energy Industry',
    icon: svgIcons.technology,
    altText: 'renewable-energy-icon',
    query: 'renewableEnergy'
  },
  {
    id: 'ResidentialAndCommercialREITs',
    title: 'Residential & Commercial REITs',
    secondaryTitle: 'Residential & Commercial REITs Industry',
    icon: svgIcons.constructionAndEngineering,
    altText: 'residential-and-commercial-reits-icon',
    query: 'residentialAndCommercialREITs'
  },
  {
    id: 'SchoolCollegeAndUniversity',
    title: 'School, College & University',
    secondaryTitle: 'School, College & University Industry',
    icon: svgIcons.technology,
    altText: 'school-college-and-university-icon',
    query: 'schoolCollegeAndUniversity'
  },
  {
    id: 'SemiconductorsAndSemiconductorEquipment',
    title: 'Semiconductors & Semiconductor Equipment',
    secondaryTitle: 'Semiconductors & Semiconductor Equipment Industry',
    icon: svgIcons.technology,
    altText: 'semiconductors-and-semiconductor-equipment-icon',
    query: 'semiconductorsAndSemiconductorEquipment'
  },
  {
    id: 'SoftwareAndITServices',
    title: 'Software & IT Services',
    secondaryTitle: 'Software & IT Services Industry',
    icon: svgIcons.technology,
    altText: 'software-and-it-services-icon',
    query: 'softwareAndITServices'
  },
  {
    id: 'SpecialtyRetailers',
    title: 'Specialty Retailers',
    secondaryTitle: 'Specialty Retailers Industry',
    icon: svgIcons.automobile,
    altText: 'specialty-retailers-icon',
    query: 'specialtyRetailers'
  },
  {
    id: 'TelecommunicationsServices',
    title: 'Telecommunications Services',
    secondaryTitle: 'Telecommunications Services Industry',
    icon: svgIcons.communicationAndNetworking,
    altText: 'telecommunications-services-icon',
    query: 'telecommunicationsServices'
  },
  {
    id: 'TextilesAndApparel',
    title: 'Textiles & Apparel',
    secondaryTitle: 'Textiles & Apparel Industry',
    icon: svgIcons.automobile,
    altText: 'textiles-and-apparel-icon',
    query: 'textilesAndApparel'
  },
  {
    id: 'TransportInfrastructure',
    title: 'Transport Infrastructure',
    secondaryTitle: 'Transport Infrastructure Industry',
    icon: svgIcons.automobile,
    altText: 'transport-infrastructure-icon',
    query: 'transportInfrastructure'
  },
  {
    id: 'Uranium',
    title: 'Uranium',
    secondaryTitle: 'Uranium Industry',
    icon: svgIcons.chemicals,
    altText: 'uranium-icon',
    query: 'uranium'
  },
  {
    id: 'WaterAndRelatedUtilities',
    title: 'Water & Related Utilities',
    secondaryTitle: 'Water & Related Utilities Industry',
    icon: svgIcons.technology,
    altText: 'water-and-related-utilities-icon',
    query: 'waterAndRelatedUtilities'
  }
];
export default industries;
