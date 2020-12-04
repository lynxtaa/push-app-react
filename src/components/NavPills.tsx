import { List, ListItem, Button } from '@chakra-ui/core'
import { useHistory, matchPath, useLocation } from 'react-router-dom'

interface Link {
	link: string
	text: string
}

interface Props {
	links: Link[]
}

export default function NavPills({ links }: Props) {
	const history = useHistory()
	const location = useLocation()

	return (
		<List mb={4} display="flex" flexWrap="wrap">
			{links.map(({ link, text }) => (
				<ListItem key={link}>
					<Button
						onClick={() => history.push(link)}
						variant={matchPath(location.pathname, { path: link }) ? 'solid' : 'ghost'}
						variantColor="brand"
					>
						{text}
					</Button>
				</ListItem>
			))}
		</List>
	)
}
