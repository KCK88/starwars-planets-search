import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { PlanetType } from '../Types';

export default function Table() {
  const planetsContext = useContext(PlanetsContext);
  const { planets, setPlanets, filter, handleFilterChange, setFilter } = planetsContext;
  let visiblePlanets: PlanetType[] = [...planets];

  const planetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    if (handleFilterChange(e)) {
      visiblePlanets = planets
        .filter((planet: PlanetType) => planet.name.includes(e.target.value));
      setPlanets(visiblePlanets);
    } else {
      visiblePlanets = [...planets];
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do planeta..."
        value={ filter }
        onChange={ planetFilter }
        data-testid="name-filter"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Created </th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Films</th>
            <th>Gravity</th>
            <th>Orbital period</th>
            <th>Population</th>
            <th>Rotation period</th>
            <th>Surface water</th>
            <th>Terrain</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {visiblePlanets.map((planet: PlanetType) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.created}</td>
              <td>{planet.diameter}</td>
              <td>{planet.edited}</td>
              <td>{planet.films}</td>
              <td>{planet.gravity}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.population}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.terrain}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>

  );
}
