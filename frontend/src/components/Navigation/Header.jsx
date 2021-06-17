import React from 'react';
import {
	AppBar, Tabs, Tab, Button
} from '@material-ui/core';
import tabs from '../../scenes/routeStates';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const Header = props => {
	const location = useLocation();
	const auth = useAuth0();

	return (
		<AppBar
			position="fixed"
		>
			<Tabs
				value={location.pathname}
				textColor="inherit"
  			indicatorColor="secondary"
			>
				{
					tabs.map((link, idx) => (
						<Tab
							key={idx}
							component={Link}
							value={link.url}
							label={link.title}
							to={link.url}
						/>
					))
				}
				<Button
					color="secondary"
					onClick={() => auth.logout({
						returnTo: `${window.location.protocol}//${window.location.host}/logout`
					})}
				>
					Logout
				</Button>
			</Tabs>
		</AppBar>
	)
}