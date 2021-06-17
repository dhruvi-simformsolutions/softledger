import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button, CircularProgress, IconButton, Tooltip,
  Dialog, DialogContent, DialogActions
} from '@material-ui/core';

const LButton = React.forwardRef(({
  isIcon=false,
  loading=false,
  children,
  disabled,
  ...rest
}, ref) => {
  if(isIcon) {
    return (
      <IconButton
        ref={ref}
        disabled={loading || disabled}
        {...rest}
      >
        {loading ? (
          <CircularProgress
            size={20}
          />
        ) : children}
      </IconButton>
    );
  }

  return (
    <Button
      ref={ref}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <CircularProgress
          size={20}
        />
      ) : children}
    </Button>
  )
})

const WithToolTip = ({
  tooltip,
  tooltipPlacement,
  ...props
}) => {

  if(tooltip) {
    return (
      <Tooltip
        title={tooltip}
        placement={tooltipPlacement}
      >
        <span>
          <LButton
            {...props}
          />
        </span>
      </Tooltip>
    )
  }

  return (
    <LButton
      {...props}
    />
  )
}

const Confirm = ({
  open,
  confirmMessage,
  onCancel,
  onSubmit,
  loading,
  confirmDisabled
}) => {

  if(!confirmMessage) return <></>;
  
  return (
    <Dialog
      open={open}
    >
      <DialogContent>
        {confirmMessage}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          variant="outlined"
          disabled={confirmDisabled || loading}
        >
          {loading ? (
            <CircularProgress
              size={20}
            />
          ) : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const LoadingButton = ({
  onClick, //required async function
  confirmMessage,
  confirmDisabled,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)

  const onSubmit = async (...params) => {
    setLoading(true);
    try {
      await onClick(params);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const handleOpen = () => setOpen(true);
  
  return (
    <div>
      <WithToolTip
        loading={loading}
        onClick={confirmMessage ? handleOpen : onSubmit}
        {...rest}        
      />
      <Confirm
        open={open}
        confirmMessage={confirmMessage}
        onCancel={() => setOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
        confirmDisabled={confirmDisabled}
      />
    </div>
  )

}


LoadingButton.propTypes = {
  //Async function
  onClick: PropTypes.func.isRequired,
  //
}