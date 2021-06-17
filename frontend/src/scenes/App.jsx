import React from 'react';
import { ErrorBoundary } from '../components';
import { CssBaseline } from '@material-ui/core';
import Root from './Root';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

const theme = {
	typography: {
		fontSize: 13
	},
	palette: {
		background: {
			primary: '#FFFFFF'
		},
		// primary: PRIMARY || primary,
		// secondary: SECONDARY || secondary,
		link: {
			main: '#337ab7'
		}
	}
}


const App = () => {
	return (
		<CssBaseline>
			<ThemeProvider theme={createTheme(theme)}>
				<ErrorBoundary>
					<Root />
				</ErrorBoundary>
			</ThemeProvider>
		</CssBaseline>
	)
}


export default App