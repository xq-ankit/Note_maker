const API_URL = "http://localhost:5000/api"

const getHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  return response.json()
}

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  return response.json()
}

export const getNotes = async () => {
  const response = await fetch(`${API_URL}/notes`, {
    headers: getHeaders(),
  })
  return response.json()
}

export const createNote = async (noteData) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(noteData),
  })
  return response.json()
}

export const updateNote = async (id, noteData) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(noteData),
  })
  return response.json()
}

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  })
  return response.json()
}

