import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Table';
import PlanetsProvider from '../context/PlanetsProvider';
import App from '../App';


describe('Teste se o componente renderiza corretamente', ()=> {
  test('renders table with correct headers', () => {
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
});
