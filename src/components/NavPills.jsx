import React from 'react'
import PropTypes from 'prop-types'

import {NavLink} from 'react-router-dom'

const NavPills = ({ links }) => (
	<ul className="nav nav-pills">
		{ links.map(({link, text}) => (
			<li className="nav-item" key={link}>
				<NavLink to={link} className="nav-link">{text}</NavLink>
			</li>
		)) }
	</ul>
)

NavPills.propTypes = {
	links: PropTypes.arrayOf(PropTypes.shape({
		link: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	})).isRequired,
}

export default NavPills
