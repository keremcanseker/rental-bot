export const initialEnegyLabelState = {
  "A+++++": false,
  "A++++": false,
  "A+++": false,
  "A++": false,
  "A+": false,
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
};

export const initialLocationState = {
  inResidentialArea: false,
  inTheCenter: false,
  onAQuietRoad: false,
  inWoodedArea: false,
  openLocation: false,
  outsideBuiltUpArea: false,
  ruralLocation: false,
  shelteredLocation: false,
  unobstructedView: false,
  onTheEdgeOfTheForest: false,
  onWater: false,
  onBusyRoad: false,
  onWaterways: false,
  atPark: false,
};

export const initialGardenLocationState = {
  south: false,
  west: false,
  east: false,
  north: false,
};

export const initialPropertiesState = {
  centralHeatingBoiler: false,
  bathingSittingPool: false,
  renewableEnergy: false,
  fireplace: false,
  doubleOccupancy: false,
  swimmingPool: false,
  jobHouse: false,
};

export const initialAvailableState = {
  available: false,
  negotiated: false,
  sold: false,
};

export const initialOutdoorSpaceState = {
  balcony: false,
  garden: false,
  roofTerrace: false,
};

export const initialGarageState = {
  parkingBasement: false,
  indoorGarage: false,
  builtInGarage: false,
  detachedGarage: false,
  garageBox: false,
  basement: false,
  garageCarport: false,
};

export const initialConstructionTypeState = {
  existingConstruction: false,
  newConstruction: false,
};

export const initialTypeOfHouseState = {
  house: false,
  apartment: false,
  parking: false,
  buildingPlot: false,
  storageSpace: false,
  storage: false,
  berth: false,
  bottom: false,
  pitch: false,
};

// export const initialTypeOfOfferState = {
//   houseOfResidence: {
//     orientation: {
//       townhouse: false,
//       detachedHouse: false,
//       cornerHouse: false,
//       twoUnderOneHoodedHouse: false,
//       semi_detachedHouse: false,
//       relaxingHome: false,
//       endHouse: false,
//     },
//     type: {
//       singleFamilyHouse: false,
//       mansion: false,
//       villa: false,
//       farmhouse: false,
//       bungalow: false,
//       countryHouse: false,
//       canalHouse: false,
//       mobileHome: false,
//       estate: false,
//       houseboat: false,
//       caravan: false,
//     },
//   },
//   apartment: {
//     orientation: {
//       doubleUpperHouse: false,
//       serviceFlat: false,
//       callAge: false,
//       corridorFlat: false,
//       basement: false,
//       careFlat: false,
//     },
//     type: {
//       upperHouse: false,
//       portionFlat: false,
//       galleryFlat: false,
//       lowerHouse: false,
//       mezzanine: false,
//       maisonnette: false,
//       portionHouse: false,
//       penthouse: false,
//       downstairsUpstairsApartment: false,
//       doubleLowerHouse: false,
//       studentRoom: false,
//     },
//   },
//   parking: {
//     type: {
//       garage: false,
//       parkingLot: false,
//       parkingBasement: false,
//       indoorGarage: false,
//     },
//     capacity: {
//       "1Car": false,
//       "2Cars": false,
//       "3Cars": false,
//       "4Cars": false,
//       "5Cars": false,
//       "6Cars": false,
//       "7Cars": false,
//       "9Cars": false,
//       "10Cars": false,
//       "11Cars": false,
//     },
//   },
//   buildingPlot: false,
//   storageSpace: false,
//   storage: false,
//   berth: false,
//   bottom: false,
//   pitch: false,
// };

export const initialOfferedSinceState = {
  last24Hours: false,
  last3Days: false,
  last5Days: false,
  last10Days: false,
  last30Days: false,
};

export const constructionPeriodState: ConstructionPeriodState = {
  unknown: false,
  before1906: false,
  between1906And1930: false,
  between1931And1944: false,
  between1945And1959: false,
  between1960And1970: false,
  between1971And1980: false,
  between1981And1990: false,
  between1991And2000: false,
  between2001And2010: false,
  between2011And2020: false,
  after2020: false,
};

export interface ConstructionPeriodState {
  unknown: boolean;
  before1906: boolean;
  between1906And1930: boolean;
  between1931And1944: boolean;
  between1945And1959: boolean;
  between1960And1970: boolean;
  between1971And1980: boolean;
  between1981And1990: boolean;
  between1991And2000: boolean;
  between2001And2010: boolean;
  between2011And2020: boolean;
  after2020: boolean;
}

// export interface SubTypes {
//   [key: string]: boolean;
// }

// export interface Orientation {
//   [key: string]: boolean | SubTypes;
// }

// export interface TypeOfOfferState {
//   [key: string]:
//     | boolean
//     | { total: boolean; orientation: Orientation; type: SubTypes };
// }
