import { Dispatch, SetStateAction } from 'react';

export interface PlanetType {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: []
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}
export interface PlanetContextType {
  planets: PlanetType[];
  setPlanets: React.Dispatch<React.SetStateAction<PlanetType[]>>;
  handleFilterChange: ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> boolean;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}
