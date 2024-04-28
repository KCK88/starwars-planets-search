import React, { ReactNode, useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children } : { children: ReactNode }) {
  const [planets, setPlanets] = useState<[]>([]);

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

    fetchData();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}
