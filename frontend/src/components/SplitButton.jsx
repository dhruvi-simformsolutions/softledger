import React, {useState, useRef} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


/**
 * Options shoudl be [{
 *  label: <String> || <JSX>
 *  onSubmit: <Function>
 * }]
 */

export const SplitButton = ({
  color='primary',
  onSubmit,
  options,
  disabled=false,
  children,
  variant="contained"
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => setOpen(a => !a);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }

  const menuSubmit = fn => {
    setOpen(false);
    fn();
  }


  return (
    <>
      <ButtonGroup 
        variant={variant}
        color={color} 
        ref={anchorRef} 
        disabled={disabled}
      >
        <Button 
          onClick={onSubmit}
        >
          {children}
        </Button>
        <Button
          color={color}
          size="small"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper 
        open={open} 
        anchorEl={anchorRef.current} 
        role={undefined} 
        transition 
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map((option, idx) => (
                    <MenuItem
                      key={idx}
                      onClick={() => menuSubmit(option.onSubmit)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}