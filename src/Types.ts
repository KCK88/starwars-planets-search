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
  planetsFilter: string;
  numbersFilter: NumbersType;
  columnOptions: string[];
  filters: NumbersType[];
  setPlanets: React.Dispatch<React.SetStateAction<PlanetType[]>>;
  setPlanetsFilter: Dispatch<SetStateAction<string>>;
  setNumbersFilter: React.Dispatch<React.SetStateAction<NumbersType>>;
  setColumnOptions: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  setFilters: React.Dispatch<React.SetStateAction<NumbersType[]>>;
  planetFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveAllFilters: () => void
  handleFilterChange: ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> boolean;

  handleNumbersChange: ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

  handleNumbersSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleColumnFilters: (event:
  React.MouseEvent<HTMLButtonElement>, column: ColumnType) => void;
}

export interface NumbersType {
  column: ColumnType;
  operator: string;
  value: string;
}
export type ColumnType =
  'population' | 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water';
