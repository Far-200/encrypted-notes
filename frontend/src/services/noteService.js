import axios from "axios";

const API = axios.create({
  baseURL: "/api/notes",
});

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getNotes = async (token) => {
  const res = await API.get("/", getAuthConfig(token));
  return res.data;
};

export const createNote = async (noteData, token) => {
  const res = await API.post("/", noteData, getAuthConfig(token));
  return res.data;
};

export const updateNote = async (id, noteData, token) => {
  const res = await API.put(`/${id}`, noteData, getAuthConfig(token));
  return res.data;
};

export const deleteNote = async (id, token) => {
  const res = await API.delete(`/${id}`, getAuthConfig(token));
  return res.data;
};

export const togglePinNote = async (id, token) => {
  const res = await API.patch(`/${id}/pin`, {}, getAuthConfig(token));
  return res.data;
};
