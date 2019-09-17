import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

export async function getUsers() {
  const {data: users} = await api.get('users');
  return users;
}

export async function getTasks() {
  const {data: tasks} = await api.get('tasks');
  return tasks;
}

export async function authenticateUser() {
  const sessionId = getLocalSession();
  if (!sessionId) {
    throw new Error('401 authorization is needed');
  }
  const {data: [session]} = await api.get('sessions', {params: {id: sessionId}});
  if (!session) {
    throw new Error('401 session is expired');
  }
  const {data: [user]} = await api.get('users', {params: {id: session.userId}});
  if (!user) {
    throw new Error('401 the session has no user');
  }
  setLocalSession(session.id);
  return user;
}

export async function loginUser(name, password) {
  const {data: [user]} = await api.get('users', {params: {name, password}});
  if (!user) {
    throw new Error('401 invalid credentials');
  }
  const {data: session} = await api.post('sessions', {userId: user.id});
  setLocalSession(session.id);
  return user;
}

export async function logOutUser() {
  const sessionId = getLocalSession();
  await api.delete(`sessions/${sessionId}`);
  removeLocalSession();
}

function getLocalSession() {
  return localStorage.getItem('session');
}

function setLocalSession(session) {
  localStorage.setItem('session', session);
}

function removeLocalSession() {
  localStorage.removeItem('session');
}
