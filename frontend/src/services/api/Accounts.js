
import api from './api';

export const all = (details) => api.get('accounts', details);

export const create = (details) => api.post('accounts', details);
