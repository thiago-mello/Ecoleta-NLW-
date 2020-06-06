import axios from 'axios';

export interface State {
  id: number;
  initials: string;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export async function getStates(): Promise<State[]> {
  const response = await axios.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  );
  const states = response.data.map(
    (state: { id: number; nome: string; sigla: string }) => ({
      id: state.id,
      name: state.nome,
      initials: state.sigla,
    })
  );

  return states;
}

export async function getCities(state: string): Promise<City[]> {
  const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios
  `);
  const cities = response.data.map((city: { id: number; nome: string }) => ({
    id: city.id,
    name: city.nome,
  }));

  return cities;
}

export default {
  getCities,
  getStates,
};
