import React, { ReactNode, useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import { PlanetType } from '../Types';

export default function PlanetsProvider({ children } : { children: ReactNode }) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) : boolean => {
    if (planets.some((planet: PlanetType) => (
      planet.name.includes(target.value)
    ))) {
      console.log('true handle');
      return true;
    }
    console.log('false handle');
    return false;
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

    if (filter === '' || filter === undefined || filter === null) fetchData();
  }, [filter]);

  return (
    <PlanetsContext.Provider
      value={ { planets, setPlanets, handleFilterChange, filter, setFilter } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}
