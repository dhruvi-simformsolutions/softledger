import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import {
	ModalForm, TextField,
} from '../../components';
import { SelectAccount } from '../../components/SelectAccount';

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
				gridSize={4}
				autoFocus
				label="Reference"
				value={model.reference}
				onChange={e => onChange('reference', e.target.value)}
				errors={!model.reference && 'Required'}
			/>
			<TextField
				gridSize={4}
				label="Currency"
				value={model.currency}
				onChange={e => onChange('currency', e.target.value)}
				errors={!model.currency && 'Required'}
			/>
			<TextField
				gridSize={4}
				label="Date"
				value={model.date}
				onChange={e => onChange('date', e.target.value)}
				errors={!model.date && 'Required'}
			/>
			<TextField
				gridSize={4}
				label="Amount"
				value={model.amount}
				onChange={e => onChange('amount', e.target.value)}
				errors={!model.amount && 'Required'}
			/>
      <SelectAccount
				gridSize={4}
				label="Account"
				value={model.Account}
				onChange={e => onChange('Account', e)}
				errors={!model.Account && 'Required'}
      />
		</Grid>
	)
}

const JournalForm = props => {
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
    return model && model.reference && model.amount && model.currency && model.Account?.id ? true : false;
  }

	return (
		<ModalForm
			header={props.header}
			customButton={props.customButton}
			isValid={isValid()}
			andNew={!props.defaultValue._id}
			onOpen={onOpen}
			onSubmit={() => props.onSubmit({
				...model,
				AccountId: model.Account.id
			})}
		>
			<Fields
				model={model}
				onChange={onChange}
			/>
		</ModalForm>
	)
}

export default JournalForm;