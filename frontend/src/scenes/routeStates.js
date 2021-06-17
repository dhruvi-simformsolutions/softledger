import {lazy} from 'react';
const Accounts = lazy(() => import('./Accounts'));
const Journals = lazy(() => import('./Journals'));

export default [{
	title: 'Accounts',
  url: '/accounts',
  component: Accounts,
}, {
	title: 'Journals',
  url: '/journals',
  component: Journals,
}]