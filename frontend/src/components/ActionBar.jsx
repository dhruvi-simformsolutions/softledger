import React from 'react';
import {
  Paper, Grid, Toolbar
} from '@material-ui/core';


export const ActionBar = ({
  actions,
  helpLink,
  spacing = 3,
  padding = 1,
  justifyContent = "flex-start",
  alignItems = "center",
  direction = "row"
}) => {
  return (
    <Paper
      sx={{
        marginBottom: 3,
        paddingTop: padding,
        paddingBottom: padding,
      }}
    >
      <Toolbar>
        <Grid
          container
          direction={direction}
          spacing={spacing}
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          {
            actions.map((action, idx) => (
              <Grid item key={idx}>
                {action}
              </Grid>
            ))
          }
        </Grid>
      </Toolbar>
    </Paper>
  )
}