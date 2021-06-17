import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../scenes/routeStates'
import {Box} from '@material-ui/core';

export const MainView = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: 7,
        paddingBottom: 3,
        paddingRight: 3,
        paddingLeft: 3,
        marginBottom: 3,
        height: '100%',
        width: '92%',
      }}
    >
      <Switch>
        <Suspense fallback="Loading...">
          {
            routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.url}
                component={route.component}
              />
            ))
          }
          <Route
            path='/'
            exact
            render={() => (
              <Redirect
                to='/tenants'
              />
            )}
          />
        </Suspense>
      </Switch>
    </Box>
  )
}