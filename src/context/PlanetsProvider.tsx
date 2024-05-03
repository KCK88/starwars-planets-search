import React, { ReactNode, useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import { ColumnType, NumbersType, OrderType, PlanetType } from '../Types';

export default function PlanetsProvider({ children } : { children: ReactNode }) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [fetchedPlanets, setFetchedPlanets] = useState<PlanetType[]>([]);
  const [planetsFilter, setPlanetsFilter] = useState('');
  const [numbersFilter, setNumbersFilter] = useState<NumbersType>({
    column: 'population',
    operator: 'maior que',
    value: '0',
  });
  const [filters, setFilters] = useState<NumbersType[]>([]);
  const [columnOptions, setColumnOptions] = useState<ColumnType[]>(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [order, setOrder] = useState<OrderType>({ column: 'population', sort: 'ASC' });

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const column = event.target.value as ColumnType;
    setOrder({ column, sort: 'ASC' });
  };

  const handleSortDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sort = event.target.value as 'ASC' | 'DESC';
    setOrder({ ...order, sort });
  };

  const handleColumnSortSubmit = () => {
    sortPlanets(order);
  };

  const sortPlanets = (param: OrderType) => {
    const { column, sort } = param;
    const sortedPlanets = [...fetchedPlanets].sort((colunA, colunB) => {
      const columnValueA = getValue(colunA[column]);
      const columnValueB = getValue(colunB[column]);

      if (columnValueA === 'unknown' && columnValueB === 'unknown') {
        return 0;
      } if (columnValueA === 'unknown') {
        return 1;
      } if (columnValueB === 'unknown') {
        return -1;
      }

      if (sort === 'ASC') {
        return compareValues(columnValueA, columnValueB);
      }
      return compareValues(columnValueB, columnValueA);
    });

    setPlanets(sortedPlanets);
  };

  const getValue = (value: any) => {
    if (value !== 'unknown') {
      return Number(value);
    }
    return value;
  };

  const compareValues = (columnValueA: any, columnValueB: any) => {
    if (columnValueA > columnValueB) {
      return 1;
    } if (columnValueA < columnValueB) {
      return -1;
    }
    return 0;
  };

  const planetFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetsFilter(event.target.value);
    if (handleFilterChange(event)) {
      const visiblePlanets = fetchedPlanets
        .filter((planet: PlanetType) => planet.name.includes(event.target.value));
      setPlanets(visiblePlanets);
    }
  };

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
    filterPlanets(numbersFilter);
    const options = columnOptions.filter((option) => option !== numbersFilter.column);
    setColumnOptions(options);
    setNumbersFilter({ ...numbersFilter, column: options[0] });
    setFilters([...filters, numbersFilter]);
  };

  const handleColumnFilters = (event:
  React.MouseEvent<HTMLButtonElement>, column: ColumnType) => {
    setColumnOptions([...columnOptions, column]);
    const columnFiltes = filters.filter((filter) => filter.column !== column);
    columnFiltes.forEach((columnFilte) => filterPlanets(columnFilte, true));
    if (columnFiltes.length === 0) {
      setPlanets(fetchedPlanets);
    }
    setFilters(columnFiltes);
  };

  const handleRemoveAllFilters = () => {
    setPlanets(fetchedPlanets);
    setFilters([]);
  };

  const filterPlanets = (filter: NumbersType, remove: boolean = false) => {
    const { column, operator, value } = filter;
    const planetsTofilter = !remove && planets.length > 0 ? planets : fetchedPlanets;
    let filteredPlanets: PlanetType[] = [];

    switch (operator) {
      case 'maior que':
        filteredPlanets = planetsTofilter.filter(
          (planet: PlanetType) => Number(planet[column]) > Number(value),
        );
        break;
      case 'menor que':
        filteredPlanets = planetsTofilter.filter(
          (planet: PlanetType) => Number(planet[column]) < Number(value),
        );
        break;
      case 'igual a':
        filteredPlanets = planetsTofilter.filter(
          (planet: PlanetType) => Number(planet[column]) === Number(value),
        );
        break;
      default:
        filteredPlanets = [...planetsTofilter];
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
      setFetchedPlanets(planetsData);
    }; fetchData();
  }, []);

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
        columnOptions,
        setColumnOptions,
        filters,
        setFilters,
        handleColumnFilters,
        planetFilter,
        handleRemoveAllFilters,
        order,
        setOrder,
        handleOrderChange,
        handleSortDirectionChange,
        handleColumnSortSubmit,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}
