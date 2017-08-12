import React from 'react'
import PropTypes from 'prop-types'

import PushListItem from './PushListItem'

const PushList = ({ sets }) => (
	<ul className="pushlist">
		{ sets.map((set, index) => <PushListItem set={set} key={index} />) }
	</ul>
)

PushList.propTypes = {
	sets: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default PushList
