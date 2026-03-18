import axios from 'axios' ;
import dotenv from 'dotenv' ;

dotenv.config();

const AUTH_API_URL = process.env.AUTH_API_URL || 'http://localhost:8080';
let JWT_SECRET = null;

const obtenerHeadersAutenticacion = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const init = async () => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/api/auth/login`, {
      nickname: process.env.BACKEND_USER,
      password: process.env.BACKEND_PWD
    });
    JWT_SECRET = response.data;
    return JWT_SECRET;
  } catch (error) {
    throw error;
  }
};

export const loginToExternalApi = async (nickname, password) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/api/auth/login`, {
      nickname,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerToExternalApi = async (userData, token) => {
  try {
    const headers = obtenerHeadersAutenticacion(token);
    const response = await axios.post(`${AUTH_API_URL}/api/auth/register`, userData, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerPlanetas = async (token) => {
  try {
    const headers = obtenerHeadersAutenticacion(token);
    const response = await axios.get(`${AUTH_API_URL}/api/planetas`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los planetas:", error.message);
    throw error;
  }
};

export const crearPlaneta = async (datos, token) => {
  try {
    const headers = obtenerHeadersAutenticacion(token);
    const response = await axios.post(`${AUTH_API_URL}/api/planetas`, datos, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al crear el planeta:", error.message);
    throw error;
  }
};

export const obtenerRanking = async (token) => {
  try {
    const headers = obtenerHeadersAutenticacion(token);
    const response = await axios.get(`${AUTH_API_URL}/api/planetas/ranking`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el ranking:", error.message);
    throw error;
  }
};

export const guardarPartida = async (datos, token) => {
  try {
    const headers = obtenerHeadersAutenticacion(token);
    const response = await axios.post(`${AUTH_API_URL}/api/partidas/guardar`, datos, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al guardar la partida:", error.message);
    throw error;
  }
};

export const finalizarPartida = async (datos, token) => {
  try {
    const headers = obtenerHeadersAutenticacion(token);
    const response = await axios.post(`${AUTH_API_URL}/api/partidas/finalizar`, datos, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al finalizar la partida:", error.message);
    throw error;
  }
};
