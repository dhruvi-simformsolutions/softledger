import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
	Container, CircularProgress
} from '@material-ui/core';
import { Navigation } from '../components/Navigation/Navigation';
import { AUTH0 } from '../constants';
import axios from '../services/axios';

const Root = props => {
	const {
		isAuthenticated,
		isLoading,
		loginWithRedirect,
		getAccessTokenSilently,
	} = useAuth0();

	useEffect(() => {
		const fn = async () => {
			if (!isAuthenticated) {
				try {
					await loginWithRedirect();
				} catch (err) {
					console.log("err5", err)
				}
			}
		};
		if (!isLoading) {
			fn();
		}
	}, [isAuthenticated, loginWithRedirect, isLoading]);

	useEffect(() => {
		if (isAuthenticated) {
			//set axios interceptor
			axios.interceptors.request.use(async request => {
				try {
					const token = await getAccessTokenSilently({
						audience: AUTH0.AUDIENCE,
						scope: 'openid profile email offline_access',
					});

					request.headers['Authorization'] = `Bearer ${token}`;
				} catch (err) {
					console.error("getTokenSilentlyErr", err);
					throw err;
				}
				return request;
			});
		}
	}, [isAuthenticated, getAccessTokenSilently])

	if (isLoading) {
		return (
			<Container
				style={{
					textAlign: 'center'
				}}
			>
				<CircularProgress />
			</Container>
		)
	}

	return (
		<Navigation />
	)
}



export default Root;