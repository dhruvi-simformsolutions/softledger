import React from 'react';
import Grid from '@material-ui/core/Grid';

export const withGridItem = Component => {

  return React.forwardRef(function GridItem({
    gridSize,
    ...props
  }, ref) {
    if(gridSize) {
      return (
        <Grid item xs={gridSize}>
          <Component ref={ref} {...props} />
        </Grid>
      )
    }
    return <Component ref={ref} {...props} />
  })

}