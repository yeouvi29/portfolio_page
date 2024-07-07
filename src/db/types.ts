export interface UserEntity {
  userName: string;
  name: string;
  email: string;
  registeredDate: string;
  membershipStatus: string;
  lastLogin: string;
  subscriptionPlan: string;
  paymentStatus: string;
}

export interface WeatherEntity {
  date: string;
  temp: {
    avg: { c: string; f: string };
    max: { c: string; f: string };
    min: { c: string; f: string };
  };
  condition: { text: string; icon: string; code: number };
}
