import React from 'react';
import AccountForm from './Form';
import {List} from './List';
import {
	Box
} from '@material-ui/core';
import { ActionBar } from '../../components';
import * as api from '../../services/api';

const Accounts = props => {

	return (
		<Box>
			<ActionBar
				actions={[
					<AccountForm
						header="Add Account"
						defaultValue={{}}
						onSubmit={api.Accounts.create}
					/>
				]}
			/>
			<List />
		</Box>
	)
}

export default Accounts;
