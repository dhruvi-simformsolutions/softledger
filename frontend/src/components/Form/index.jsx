import React from "react";
import PropTypes from 'prop-types';
import { FormProvider } from "./Context";
import {ModalForm} from './ModalForm';

const Form =  props => {
  return (
		<FormProvider 
      {...props}
    >
      <ModalForm>
        {props.children}
      </ModalForm>
		</FormProvider>
  );
};

export {Form as ModalForm};

Form.propTypes = {

  //Header
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),

  //Custom toggle button to show
  // setOpen => <JSX>
  customButton: PropTypes.func,

  //Called when modal is opened
  onOpen: PropTypes.func,

  //Called when modal is closed
  onClose: PropTypes.func,

  //Called when the submit button is clicked
  onSubmit: PropTypes.func.isRequired,

  //Called when the cancel button is clicked
  onCancel: PropTypes.func,

  //If set true will show parsed error message in modal after a failed submit
  showErrorInModal: PropTypes.bool,

  //Generic error to show if showErrorInModal is false
  fallbackErrorMessage: PropTypes.string,

  //STYLE and PASSDOWN PROPS
  dialogWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),

  //show drop down button with option to submit and new
  andNew: PropTypes.bool,

  //
  isValid: PropTypes.bool.isRequired,
}

Form.defaultProps = {
  showErrorInModal: true,
  fallbackErrorMessage: 'Failed',
  dialogWidth: 'sm',
  andNew: false
}