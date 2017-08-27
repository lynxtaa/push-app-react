import React from 'react'
import PropTypes from 'prop-types'

const PushList = ({ children }) => <ul className="pushlist">{children}</ul>

PushList.propTypes = {
	children: PropTypes.node.isRequired,
}

export default PushList
