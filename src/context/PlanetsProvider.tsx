import React, { ReactNode, useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import { ColumnType, NumbersType, PlanetType } from '../Types';

export default function PlanetsProvider({ children } : { children: ReactNode }) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [planetsFilter, setPlanetsFilter] = useState('');
  const [numbersFilter, setNumbersFilter] = useState<NumbersType>({
    column: 'population',
    operator: 'maior que',
    value: '0',
  });
  const [filters, setFilters] = useState<NumbersType[]>([]);
  const [filterOptions, setFilterOptions] = useState<ColumnType[]>(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const handleFilterChange = ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): boolean => {
    return !!(planets.some((planet: PlanetType) => (
      planet.name.includes(target.value)
    )));
  };

  const handleNumbersChange = ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: targetName, value } = target;
    setNumbersFilter({ ...numbersFilter, [targetName]: value });
  };

  const handleNumbersSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    filterPlanets();
    const options = filterOptions.filter((option) => option !== numbersFilter.column);
    setFilterOptions(options);
    setNumbersFilter({ ...numbersFilter, column: options[0] });
    setFilters([...filters, numbersFilter]);
  };

  const handleExcludeFilter = (event:
  React.MouseEvent<HTMLButtonElement>, column: NumbersType) => {
    event.preventDefault();
    console.log(filters);
  };

  const filterPlanets = () => {
    const { column, operator, value } = numbersFilter;
    let filteredPlanets: PlanetType[] = [];

    switch (operator) {
      case 'maior que':
        filteredPlanets = planets.filter(
          (planet: PlanetType) => Number(planet[column]) > Number(value),
        );
        break;
      case 'menor que':
        filteredPlanets = planets.filter(
          (planet: PlanetType) => Number(planet[column]) < Number(value),
        );
        break;
      case 'igual a':
        filteredPlanets = planets.filter(
          (planet: PlanetType) => Number(planet[column]) === Number(value),
        );
        break;
      default:
        filteredPlanets = [...planets];
        break;
    }

    setPlanets(filteredPlanets);
  };

  const fetchPlanets = async () => {
    try {
      const request = await fetch('https://starwars-api-backup.vercel.app/planets');
      const response = await request.json();
      response.results.forEach((planet: { residents: any; }) => {
        delete planet.residents;
      });
      return response.results;
    } catch (error: any) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const planetsData = await fetchPlanets();
      setPlanets(planetsData);
    };

    if (planetsFilter === ''
    || planetsFilter === undefined
    || planetsFilter === null) fetchData();
  }, [planetsFilter]);

  return (
    <PlanetsContext.Provider
      value={ { planets,
        setPlanets,
        handleFilterChange,
        planetsFilter,
        setPlanetsFilter,
        numbersFilter,
        setNumbersFilter,
        handleNumbersChange,
        handleNumbersSubmit,
        filterOptions,
        setFilterOptions,
        filters,
        setFilters,
        handleExcludeFilter } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}
