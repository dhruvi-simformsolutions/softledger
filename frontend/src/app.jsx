import React from 'react';
import AuthWithHistory from './AuthWithHistory';
import { BrowserRouter as Router } from "react-router-dom";

import { RecoilRoot } from 'recoil';

//3rd party imports first
import App from './scenes/App';

export const RootApp = props => (
	<Router>
		<AuthWithHistory>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</AuthWithHistory>
	</Router>
);