import { v4 as uuidv4 } from "uuid";

export const SF_VISITOR_VOLUME = [
  { year: 2019, day: 15.78, domestic: 7.48, international: 2.95 },
  { year: 2020, day: 8.91, domestic: 2.41, international: 0.5 },
  { year: 2021, day: 12.48, domestic: 3.98, international: 0.56 },
  { year: 2022, day: 14.77, domestic: 5.43, international: 1.74 },
];

export const SF_VISITOR_STAY_PERCENTAGE = {
  labels: ["Hotel", "Airbnb", "Hostel", "Friends/Family", "Other"],
  data: [45, 30, 10, 10, 5],
};
export interface AttractionDataType {
  title: string;
  image: string;
  description: string;
  rating: number;
  estimated_visit_duration: string;
}
export const SF_ATTRACTIONS = [
  {
    title: "Golden Gate Bridge",
    image: "/assets/attractions/golden_gate_bridge.webp",
    description:
      "The Golden Gate Bridge is an iconic suspension bridge connecting San Francisco Bay and the Pacific Ocean. It offers stunning views and is a popular spot for tourists.",
    rating: 4.8,
    estimated_visit_duration: "1-2 hours",
  },
  {
    title: "Alcatraz Island",
    image: "/assets/attractions/alcatraz_island.webp",
    description:
      "Alcatraz Island, located in San Francisco Bay, is home to the infamous Alcatraz Federal Penitentiary. The island offers tours of the prison, beautiful views of the bay, and historical insights.",
    rating: 4.7,
    estimated_visit_duration: "2-3 hours",
  },
  {
    title: "Fisherman's Wharf",
    image: "/assets/attractions/fishermans_wharf.webp",
    description:
      "Fisherman's Wharf is a bustling waterfront area in San Francisco known for its seafood, souvenir shops, and attractions like Pier 39, sea lions, and maritime museums.",
    rating: 4.5,
    estimated_visit_duration: "2-4 hours",
  },
  {
    title: "Golden Gate Park",
    image: "/assets/attractions/golden_gate_park.webp",
    description:
      "Golden Gate Park is a large urban park in San Francisco, featuring gardens, museums, and recreational areas. It is perfect for a relaxing day out with numerous attractions like the Japanese Tea Garden and the California Academy of Sciences.",
    rating: 4.6,
    estimated_visit_duration: "3-5 hours",
  },
  {
    title: "Chinatown",
    image: "/assets/attractions/chinatown.webp",
    description:
      "San Francisco's Chinatown is the largest Chinatown outside of Asia and the oldest in North America. It is a vibrant neighborhood with shops, restaurants, and cultural landmarks.",
    rating: 4.4,
    estimated_visit_duration: "1-2 hours",
  },
  {
    title: "Lombard Street",
    image: "/assets/attractions/lombard_street.webp",
    description:
      "Lombard Street is famous for its steep, one-block section with eight hairpin turns. It is known as the 'crookedest street in the world' and offers a unique driving or walking experience.",
    rating: 4.3,
    estimated_visit_duration: "30 minutes - 1 hour",
  },
  {
    title: "Union Square",
    image: "/assets/attractions/union_square.webp",
    description:
      "Union Square is a major commercial and cultural hub in San Francisco, featuring high-end shops, hotels, theaters, and art galleries. It is a great place for shopping and people-watching.",
    rating: 4.2,
    estimated_visit_duration: "1-2 hours",
  },
  {
    title: "Coit Tower",
    image: "/assets/attractions/coit_tower.webp",
    description:
      "Coit Tower is an Art Deco tower in the Telegraph Hill neighborhood offering panoramic views of the city and the bay. It also features murals depicting California life in the 1930s.",
    rating: 4.5,
    estimated_visit_duration: "1-1.5 hours",
  },
  {
    title: "Palace of Fine Arts",
    image: "/assets/attractions/palace_of_fine_arts.webp",
    description:
      "The Palace of Fine Arts is a monumental structure originally constructed for the 1915 Panama-Pacific Exposition. It is a beautiful place for photography and relaxing by the lagoon.",
    rating: 4.6,
    estimated_visit_duration: "1-2 hours",
  },
  {
    title: "Exploratorium",
    image: "/assets/attractions/exploratorium.webp",
    description:
      "The Exploratorium is a hands-on science museum in San Francisco, offering interactive exhibits and activities for visitors of all ages. It is an educational and fun experience.",
    rating: 4.7,
    estimated_visit_duration: "2-3 hours",
  },
];

export const DEFAULT_TASKS = [
  {
    title: "To do",
    id: uuidv4(),
    items: [
      {
        id: uuidv4(),
        text: "Write project proposal",
      },
      { id: uuidv4(), text: "Create wireframes" },
      { id: uuidv4(), text: "Do research" },
    ],
  },
  {
    title: "In Progress",
    id: uuidv4(),
    items: [
      { id: uuidv4(), text: "Develop login functionality" },
      { id: uuidv4(), text: "Design user profile page" },
      { id: uuidv4(), text: "Set up database schema" },
    ],
  },
  {
    title: "Done 🎉",
    id: uuidv4(),
    items: [
      { id: uuidv4(), text: "Initial project setup" },
      { id: uuidv4(), text: "Design landing page" },
    ],
  },
];
