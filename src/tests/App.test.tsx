import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Table from '../components/Table';
import PlanetsProvider from '../context/PlanetsProvider';
import App from '../App';
import { vi } from 'vitest';


describe('Teste se o componente renderiza corretamente', ()=> {
  test('renderiza a tabela com cabeçalhos corretos', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);

    const columnLabel = screen.getByText(/column/i);
    const columnName = screen.getByRole('columnheader', {  name: /name/i});
    const colunClimate = screen.getByRole('columnheader', {  name: /climate/i});
    const colunCreated = screen.getByRole('columnheader', {  name: /created/i});
    const colunDiameter = screen.getByRole('columnheader', {  name: /diameter/i});
    const colunEdited = screen.getByRole('columnheader', {  name: /edited/i});
    const colunFilms = screen.getByRole('columnheader', {  name: /films/i});
    const colunGravity = screen.getByRole('columnheader', {  name: /gravity/i});
    const colunOrbitalPeriod = screen.getByRole('columnheader', {  name: /orbital period/i});
    const colunPopulation = screen.getByRole('columnheader', {  name: /orbital period/i});
    const colunRotationPeriod = screen.getByRole('columnheader', {  name: /rotation period/i});
    const colunSurfaceWater	= screen.getByRole('columnheader', {  name: /surface water/i});
    const colunTerrain = screen.getByRole('columnheader', {  name: /surface water/i});
    const colunUrl = screen.getByRole('columnheader', {  name: /url/i});

    expect(columnName).toBeInTheDocument();
    expect(colunClimate).toBeInTheDocument();
    expect(colunCreated).toBeInTheDocument();
    expect(colunDiameter).toBeInTheDocument();
    expect(colunEdited).toBeInTheDocument();
    expect(colunFilms).toBeInTheDocument();
    expect(colunGravity).toBeInTheDocument();
    expect(colunOrbitalPeriod).toBeInTheDocument();
    expect(colunPopulation).toBeInTheDocument();
    expect(colunRotationPeriod).toBeInTheDocument();
    expect(colunSurfaceWater).toBeInTheDocument();
    expect(colunTerrain).toBeInTheDocument();
    expect(colunUrl).toBeInTheDocument();
    expect(columnLabel).toBeInTheDocument();
  });
  test('Testa se o input column está funcionando', () =>{
    render(<PlanetsProvider><App /></PlanetsProvider>);
    const inputColumn = screen.getByRole('textbox', {  name: /text/i})
    fireEvent.change(inputColumn, {target:{value: '0'}})
    expect(inputColumn).toHaveValue('0')
  })

  test('Testa se o select está funcionando', () =>{
    render(<PlanetsProvider><App /></PlanetsProvider>);
    const selectColunm = screen.getByRole('combobox', {
      name: /ordenar/i
    })
    fireEvent.change(selectColunm, {target:{value: 'population'}})
    expect(selectColunm).toHaveValue('population')
  })

    test('Testa se o select operator está funcionando', () =>{
    render(<PlanetsProvider><App /></PlanetsProvider>);
    const selectOperator = screen.getByRole('combobox', {
      name: /operator/i
    })
    fireEvent.change(selectOperator, {target:{value: 'maior que'}})
    expect(selectOperator).toHaveValue('maior que')
  })

     test('Testa se o select Number está funcionando', () =>{
    render(<PlanetsProvider><App /></PlanetsProvider>);
    const selectNumber = screen.getByRole('textbox', {  name: /number/i})
    fireEvent.change(selectNumber, {target:{value: '0'}})
    expect(selectNumber).toHaveValue('0')
  })

  test('Testa se o select Number está funcionando', () =>{

    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => ({results: [{  climate: 'temperate',
        created: '',
        diameter: '',
        edited: '',
        films: [],
        gravity: '',
        name: '',
        residents: '',
        orbital_period: '',
        population: '1000',
        rotation_period: '',
        surface_water: '',
        terrain: '',
        url: '',}]}),
    } as Response;
    
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    render(<PlanetsProvider><App /></PlanetsProvider>);
    screen.debug()
    const sortButton = screen.getByRole('button', {
      name: /ordenar/i
    })
    fireEvent.click(sortButton)
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(mockFetch).toHaveBeenCalledTimes(1);
  })


});
