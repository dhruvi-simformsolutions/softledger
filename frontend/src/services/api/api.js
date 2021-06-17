import axios from '../axios';
import {API_URL} from '../../constants';

class Api{

	//maybe we can parse query now
	get = (url, query) => axios({
		url: `${API_URL}/${url}`,
		params: {
			...query
		},
		method: 'GET',
	})
	.then(response => response.data)

	put = (url, data) => axios({
		url: `${API_URL}/${url}`,
		params: {},
		method: 'PUT',
		data,
	})
	.then(response => response.data)

	post = (url, data) => axios({
		url: `${API_URL}/${url}`,
		params: {},
		method: 'POST',
		data,
	})
	.then(response => response.data)

	delete = (url, data) => {
		return axios({
			url: `${API_URL}/${url}`,
			params: {},
			method: 'DELETE',
			data
		})
		.then(response => response.data);
	}

}

export default new Api();