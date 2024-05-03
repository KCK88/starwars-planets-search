import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { PlanetType } from '../Types';

export default function Table() {
  const planetsContext = useContext(PlanetsContext);
  const { planetsFilter,
    numbersFilter,
    handleNumbersChange,
    handleNumbersSubmit,
    columnOptions,
    filters,
    handleColumnFilters,
    planetFilter,
    planets,
    handleRemoveAllFilters,
    order,
    handleOrderChange,
    handleSortDirectionChange,
    handleColumnSortSubmit } = planetsContext;

  const { column, operator, value } = numbersFilter;

  return (
    <div>
      <label htmlFor="text">Text</label>
      <input
        type="text"
        name="text"
        id="text"
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
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
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
      <form onSubmit={ (event) => event.preventDefault() }>
        <label htmlFor="sort">Ordenar</label>
        <select
          name="sort"
          id="sort"
          value={ order.column }
          onChange={ handleOrderChange }
          data-testid="column-sort"
        >
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="ascendente">ascendente</label>
        <input
          type="radio"
          name="sortDirection"
          id="ascendente"
          value="ASC"
          checked={ order.sort === 'ASC' }
          onChange={ handleSortDirectionChange }
          data-testid="column-sort-input-asc"
        />
        <label htmlFor="descendente">descendente</label>
        <input
          type="radio"
          name="sortDirection"
          id="descendente"
          value="DESC"
          checked={ order.sort === 'DESC' }
          onChange={ handleSortDirectionChange }
          data-testid="column-sort-input-desc"
        />
        <button
          onClick={ handleColumnSortSubmit }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </form>
      {/* data-testid="planet-name" */}
      {filters.map((filter) => (
        <p key={ filter.column } data-testid="filter">
          {filter.column}
          {' '}
          {filter.operator}
          {' '}
          {filter.value}
          {' '}
          <button
            onClick={ (event) => handleColumnFilters(event, filter.column) }
          >
            ❌
          </button>
        </p>
      ))}
      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover todas filtragens
      </button>
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
          {planets.map((planet: PlanetType) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
