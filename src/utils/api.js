import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

export default {
  async getSession(sessionId) {
    const {data: [session]} = await api.get('sessions', {params: {id: sessionId}});
    return session;
  },
  async getUser(name, password) {
    const {data: [user]} = await api.get('users', {params: {name, password}});
    return user;
  },
};
