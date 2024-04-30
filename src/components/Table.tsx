import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { PlanetType } from '../Types';

export default function Table() {
  const planetsContext = useContext(PlanetsContext);
  const { planets,
    setPlanets,
    planetsFilter,
    handleFilterChange,
    setPlanetsFilter,
    numbersFilter,
    handleNumbersChange,
    handleNumbersSubmit } = planetsContext;
  let visiblePlanets: PlanetType[] = [...planets];

  const planetFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetsFilter(event.target.value);
    if (handleFilterChange(event)) {
      visiblePlanets = planets
        .filter((planet: PlanetType) => planet.name.includes(event.target.value));
      setPlanets(visiblePlanets);
    } else {
      visiblePlanets = [...planets];
    }
  };

  const { column, operator, value } = numbersFilter;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the name of the planet..."
        value={ planetsFilter }
        onChange={ planetFilter }
        data-testid="name-filter"
      />
      <form onSubmit={ handleNumbersSubmit }>
        <label htmlFor="column">Column</label>
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          value={ column }
          onChange={ handleNumbersChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <label htmlFor="operator">Operator</label>
        <select
          name="operator"
          id="operator"
          data-testid="comparison-filter"
          value={ operator }
          onChange={ handleNumbersChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <label htmlFor="value">Number</label>
        <input
          type="value"
          value={ value }
          name="value"
          id="value"
          data-testid="value-filter"
          onChange={ handleNumbersChange }
        />

        <button type="submit" data-testid="button-filter">Filtrar</button>

      </form>
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
