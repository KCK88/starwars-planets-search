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
  planetsFilter: string;
  setPlanetsFilter: Dispatch<SetStateAction<string>>;
  numbersFilter: NumbersType;
  setNumbersFilter: React.Dispatch<React.SetStateAction<NumbersType>>;
  handleNumbersChange: ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNumbersSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  filterOptions: string[];
  setFilterOptions: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  filters: NumbersType[];
  setFilters: React.Dispatch<React.SetStateAction<NumbersType[]>>;
  handleExcludeFilter: (event:
  React.MouseEvent<HTMLButtonElement>, {
      column, operator, value }: NumbersType) => void;
}

export interface NumbersType {
  column: ColumnType
  operator: string;
  value: string;
}
export type ColumnType =
  'population' | 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water';
