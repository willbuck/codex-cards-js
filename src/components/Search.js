import React from 'react';
import { Link } from 'react-router';
import Autosuggest from 'react-autosuggest';

import { toURL } from '../utils';


class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = { searchText: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (e) {
		const searchText = e.target.value;
		this.setState({searchText});
	}

	render () {
		const { cards } = this.props.data;
		const { searchText } = this.state;

		let results = [];

		if (searchText && searchText.length > 2) {
			const searchTerms = toURL(searchText).split('_');
			// TODO: un-roll to a loop and kill the filter early if there are too many results
			results = Object.keys(cards).filter((key) => {
				if (searchTerms.every((term) => { return (cards[key].searchableText.indexOf(term.toLowerCase()) !== -1); })) {
					return true;
				}
				return false;
			});
		}

		return (
			<div className="search-container">

				<Autosuggest suggestions={results}
					getSuggestionValue={x => x}
					renderSuggestion={name => <div className="search-result" key={name}><Link to={"/card/" + toURL(name)}>{name}</Link></div>}
					inputProps={{
						onChange: this.handleChange,
						value: this.state.searchText,
						placeholder: 'Search for a card...'
					}}
					onSuggestionSelected={(e, {suggestion}) => { window.location = '/card/' + toURL(suggestion); }}
					focusFirstSuggestion={true}
				/>

			</div>
		);
	}
}

export default Search;
