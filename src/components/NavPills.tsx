import React from 'react'

import { NavLink } from 'react-router-dom'

interface Link {
	link: string
	text: string
}

interface Props {
	links: Link[]
}

const NavPills = ({ links }: Props) => (
	<ul className="nav nav-pills mb-3">
		{links.map(({ link, text }) => (
			<li className="nav-item" key={link}>
				<NavLink to={link} className="nav-link">
					{text}
				</NavLink>
			</li>
		))}
	</ul>
)

export default NavPills
