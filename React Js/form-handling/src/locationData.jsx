const countries = [
  { id: 1, name: "India" },
  { id: 2, name: "United States" },
  { id: 3, name: "Canada" },
  { id: 4, name: "Australia" },
  { id: 5, name: "United Kingdom" },
  { id: 6, name: "Germany" },
  { id: 7, name: "France" },
  { id: 8, name: "Japan" },
  { id: 9, name: "Brazil" },
  { id: 10, name: "United Arab Emirates" }
];

const states = [
  // India - country_id: 1
  { id: 1, country_id: 1, name: "Andhra Pradesh" },
  { id: 2, country_id: 1, name: "Arunachal Pradesh" },
  { id: 3, country_id: 1, name: "Assam" },
  { id: 4, country_id: 1, name: "Bihar" },
  { id: 5, country_id: 1, name: "Chhattisgarh" },
  { id: 6, country_id: 1, name: "Goa" },
  { id: 7, country_id: 1, name: "Gujarat" },
  { id: 8, country_id: 1, name: "Haryana" },
  { id: 9, country_id: 1, name: "Himachal Pradesh" },
  { id: 10, country_id: 1, name: "Jharkhand" },
  { id: 11, country_id: 1, name: "Karnataka" },
  { id: 12, country_id: 1, name: "Kerala" },
  { id: 13, country_id: 1, name: "Madhya Pradesh" },
  { id: 14, country_id: 1, name: "Maharashtra" },
  { id: 15, country_id: 1, name: "Manipur" },
  { id: 16, country_id: 1, name: "Meghalaya" },
  { id: 17, country_id: 1, name: "Mizoram" },
  { id: 18, country_id: 1, name: "Nagaland" },
  { id: 19, country_id: 1, name: "Odisha" },
  { id: 20, country_id: 1, name: "Punjab" },
  { id: 21, country_id: 1, name: "Rajasthan" },
  { id: 22, country_id: 1, name: "Sikkim" },
  { id: 23, country_id: 1, name: "Tamil Nadu" },
  { id: 24, country_id: 1, name: "Telangana" },
  { id: 25, country_id: 1, name: "Tripura" },
  { id: 26, country_id: 1, name: "Uttar Pradesh" },
  { id: 27, country_id: 1, name: "Uttarakhand" },
  { id: 28, country_id: 1, name: "West Bengal" },

  // United States - country_id: 2
  { id: 29, country_id: 2, name: "Alabama" },
  { id: 30, country_id: 2, name: "Alaska" },
  { id: 31, country_id: 2, name: "Arizona" },
  { id: 32, country_id: 2, name: "California" },
  { id: 33, country_id: 2, name: "Colorado" },
  { id: 34, country_id: 2, name: "Florida" },
  { id: 35, country_id: 2, name: "Georgia" },
  { id: 36, country_id: 2, name: "Illinois" },
  { id: 37, country_id: 2, name: "New Jersey" },
  { id: 38, country_id: 2, name: "New York" },
  { id: 39, country_id: 2, name: "Ohio" },
  { id: 40, country_id: 2, name: "Texas" },
  { id: 41, country_id: 2, name: "Virginia" },
  { id: 42, country_id: 2, name: "Washington" },

  // Canada - country_id: 3
  { id: 43, country_id: 3, name: "Alberta" },
  { id: 44, country_id: 3, name: "British Columbia" },
  { id: 45, country_id: 3, name: "Manitoba" },
  { id: 46, country_id: 3, name: "New Brunswick" },
  { id: 47, country_id: 3, name: "Newfoundland and Labrador" },
  { id: 48, country_id: 3, name: "Nova Scotia" },
  { id: 49, country_id: 3, name: "Ontario" },
  { id: 50, country_id: 3, name: "Quebec" },
  { id: 51, country_id: 3, name: "Saskatchewan" },

  // Australia - country_id: 4
  { id: 52, country_id: 4, name: "New South Wales" },
  { id: 53, country_id: 4, name: "Queensland" },
  { id: 54, country_id: 4, name: "South Australia" },
  { id: 55, country_id: 4, name: "Tasmania" },
  { id: 56, country_id: 4, name: "Victoria" },
  { id: 57, country_id: 4, name: "Western Australia" },

  // United Kingdom - country_id: 5
  { id: 58, country_id: 5, name: "England" },
  { id: 59, country_id: 5, name: "Scotland" },
  { id: 60, country_id: 5, name: "Wales" },
  { id: 61, country_id: 5, name: "Northern Ireland" },

  // Germany - country_id: 6
  { id: 62, country_id: 6, name: "Bavaria" },
  { id: 63, country_id: 6, name: "Berlin" },
  { id: 64, country_id: 6, name: "Brandenburg" },
  { id: 65, country_id: 6, name: "Hesse" },
  { id: 66, country_id: 6, name: "North Rhine-Westphalia" },
  { id: 67, country_id: 6, name: "Saxony" },

  // France - country_id: 7
  { id: 68, country_id: 7, name: "Île-de-France" },
  { id: 69, country_id: 7, name: "Normandy" },
  { id: 70, country_id: 7, name: "Brittany" },
  { id: 71, country_id: 7, name: "Occitanie" },
  { id: 72, country_id: 7, name: "Provence-Alpes-Côte d'Azur" },

  // Japan - country_id: 8
  { id: 73, country_id: 8, name: "Tokyo" },
  { id: 74, country_id: 8, name: "Osaka" },
  { id: 75, country_id: 8, name: "Kyoto" },
  { id: 76, country_id: 8, name: "Hokkaido" },
  { id: 77, country_id: 8, name: "Fukuoka" },

  // Brazil - country_id: 9
  { id: 78, country_id: 9, name: "São Paulo" },
  { id: 79, country_id: 9, name: "Rio de Janeiro" },
  { id: 80, country_id: 9, name: "Minas Gerais" },
  { id: 81, country_id: 9, name: "Bahia" },
  { id: 82, country_id: 9, name: "Paraná" },

  // United Arab Emirates - country_id: 10
  { id: 83, country_id: 10, name: "Abu Dhabi" },
  { id: 84, country_id: 10, name: "Dubai" },
  { id: 85, country_id: 10, name: "Sharjah" },
  { id: 86, country_id: 10, name: "Ajman" },
  { id: 87, country_id: 10, name: "Fujairah" },
  { id: 88, country_id: 10, name: "Ras Al Khaimah" },
  { id: 89, country_id: 10, name: "Umm Al Quwain" }
];

export {countries, states}