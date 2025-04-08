import { Patient } from "../types/Patient";

const API_URL = "http://localhost:4000/patients";

export async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch patients");
  }
  return res.json();
}
