import { PiBridgeBold, PiParkFill, PiBowlFoodBold } from "react-icons/pi";
import { FaLandmark, FaShoppingBag, FaPalette, FaAnchor } from "react-icons/fa";
import { FaFish, FaCarSide } from "react-icons/fa6";

//  "sf-red": "#C0362C",
// "sf-blue": "#1D6D9B",
// "sf-gray": "#A3A3A3",
// "sf-orange": "#FD5A1E",
// "sf-green": "#4CAF50",
export const ATTRACTIONS_LAT_LNG = [
  {
    name: "Golden Gate Bridge",
    location: { lat: 37.8199, lng: -122.4783 },
    website: "https://goldengate.org",
    background: "#4CAF50",
    icon: <PiBridgeBold />,
  },
  {
    name: "Alcatraz Island",
    location: { lat: 37.8267, lng: -122.423 },
    website: "https://www.nps.gov/alca/index.htm",
    background: "#FD5A1E",
    icon: <FaLandmark />,
  },
  {
    name: "Fisherman's Wharf",
    location: { lat: 37.808, lng: -122.4177 },
    website: "https://www.fishermanswharf.org",
    background: "#1D6D9B",
    icon: <FaFish />,
  },
  {
    name: "Union Square",
    location: { lat: 37.7879, lng: -122.4074 },
    website: "https://www.visitunionsquaresf.com",
    background: "#A3A3A3",
    icon: <FaShoppingBag />,
  },
  {
    name: "Golden Gate Park",
    location: { lat: 37.7694, lng: -122.4862 },
    website: "https://sfrecpark.org/ggp",
    background: "#4CAF50",
    icon: <PiParkFill />,
  },
  {
    name: "Chinatown",
    location: { lat: 37.7941, lng: -122.4078 },
    website: "https://www.sanfranciscochinatown.com",
    background: "#C0362C",
    icon: <PiBowlFoodBold />,
  },
  {
    name: "Lombard Street",
    location: { lat: 37.8021, lng: -122.4187 },
    website: "https://www.sftodo.com/lombard-street.html",
    background: "#FD5A1E",
    icon: <FaCarSide />,
  },
  {
    name: "Palace of Fine Arts",
    location: { lat: 37.8024, lng: -122.4482 },
    website: "https://palaceoffinearts.org",
    background: "#A3A3A3",
    icon: <FaPalette />,
  },
  {
    name: "Pier 39",
    location: { lat: 37.8087, lng: -122.4098 },
    website: "https://www.pier39.com",
    background: "#1D6D9B",
    icon: <FaAnchor />,
  },
  {
    name: "Coit Tower",
    location: { lat: 37.8024, lng: -122.4058 },
    website:
      "https://sfrecpark.org/destination/telegraph-hill-pioneer-park/coit-tower",
    background: "#FD5A1E",
    icon: <FaLandmark />,
  },
];
