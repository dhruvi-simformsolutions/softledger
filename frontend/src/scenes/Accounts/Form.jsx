import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import {
	ModalForm, TextField,
} from '../../components';

const Fields = ({
	model,
	onChange,
}) => {
	if (!model) return <></>;

	return (
		<Grid
			container
			spacing={3}
		>
			<TextField
				gridSize={6}
				autoFocus
				label="Number"
				value={model.number}
				onChange={e => onChange('number', e.target.value)}
				errors={!model.number && 'Required'}
			/>
			<TextField
				gridSize={6}
				label="Name"
				value={model.name}
				onChange={e => onChange('name', e.target.value)}
				errors={!model.name && 'Required'}
			/>
			<TextField
				gridSize={6}
				label="Type"
				value={model.type}
				onChange={e => onChange('type', e.target.value)}
				errors={!model.type && 'Required'}
			/>
		</Grid>
	)
}

const AccountForm = props => {
	const [model, setModel] = useState();

	const onOpen = React.useCallback(() => {
		setModel({ ...props.defaultValue });
	}, [props.defaultValue, setModel]);

	const onChange = (field, value) => {
		let m = { ...model };
		m[field] = value;
		setModel(m);
	}

  const isValid = () => {
    return model && model.name && model.type && model.number;
  }

	return (
		<ModalForm
			header={props.header}
			customButton={props.customButton}
			isValid={isValid()}
			andNew={!props.defaultValue._id}
			onOpen={onOpen}
			onSubmit={() => props.onSubmit(model)}
		>
			<Fields
				model={model}
				onChange={onChange}
			/>
		</ModalForm>
	)
}

export default AccountForm;