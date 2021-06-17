import React from 'react';
import Form from './Form';
import {List} from './List';
import {
	Box
} from '@material-ui/core';
import { ActionBar } from '../../components';
import {DateTime} from 'luxon';
import * as api from '../../services/api';

const Journals = props => {

	return (
		<Box>
			<ActionBar
				actions={[
					<Form
						header="Add Journal"
						defaultValue={{
							currency: 'USD',
							date: DateTime.now().toISODate()
						}}
						onSubmit={api.Journals.create}
					/>
				]}
			/>
			<List />
		</Box>
	)
}

export default Journals;
