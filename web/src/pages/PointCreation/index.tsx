import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { Container, Form, Legend, Field, Grid } from './styles';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import places, { State, City } from '../../services/places';

interface Item {
  id: number;
  image: string;
  image_url: string;
  title: string;
}

const PointCreation: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>();
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('items').then((response) => setItems(response.data));
  }, []);

  useEffect(() => {
    places.getStates().then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      places.getCities(selectedState).then(setCities);
    }
  }, [selectedState]);

  function handleStateSelection(event: ChangeEvent<HTMLSelectElement>) {
    const state = event.target.value;
    setSelectedState(state);
  }

  function handleCitySelection(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { latlng } = event;
    setSelectedPosition([latlng.lat, latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleItemSelection(itemId: number) {
    const previousSelection = selectedItems.indexOf(itemId);
    if (previousSelection < 0) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      const filteredItems = selectedItems.filter((item) => item !== itemId);
      setSelectedItems(filteredItems);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = selectedPosition;

    const data = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      items: selectedItems,
      state: selectedState,
      city: selectedCity,
    };

    await api.post('points', data);
    history.push('/');
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <Form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <Legend>
            <h2>Dados</h2>
          </Legend>

          <Field>
            <label htmlFor="name">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </Field>

          <div className="field-group">
            <Field>
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </Field>

            <Field>
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <Legend>
            <h2>Endereço</h2>
            <span>Selecione o Endereço no mapa</span>
          </Legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <Field>
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" onChange={handleStateSelection}>
                <option value="0">Selecione uma UF</option>

                {states.map((state) => (
                  <option key={state.id} value={state.initials}>
                    {state.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" onChange={handleCitySelection}>
                <option value="0">Selecione uma cidade</option>

                {cities.map((city) => (
                  <option key={city.id}>{city.name}</option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <Legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </Legend>

          <Grid>
            {items?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleItemSelection(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </Grid>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  );
};

export default PointCreation;
