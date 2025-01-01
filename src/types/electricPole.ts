// src/types/electricPole.ts
export interface ElectricPole {
  id: number;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
