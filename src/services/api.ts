// src/services/api.ts
import { ElectricPole } from "../types/electricPole";

export const fetchElectricPoles = async (): Promise<ElectricPole[]> => {
  const response = await fetch("http://localhost:5000/api/ElectricPoles");
  if (!response.ok) {
    throw new Error("Failed to fetch electric poles");
  }
  return response.json();
};
