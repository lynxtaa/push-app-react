import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

interface Props {
	children: React.ReactNode
	id: string
}

const Portal = ({ id, children }: Props) => {
	const portalRef = useRef<HTMLElement>(
		document.getElementById(id) || document.createElement('div'),
	)

	useEffect(() => {
		const portal = portalRef.current

		if (!document.getElementById(id)) {
			portal.id = id
			document.body.insertBefore(portal, document.body.firstChild)
		}

		return () => {
			document.body.removeChild(portal)
		}
	})

	return ReactDOM.createPortal(children, portalRef.current)
}

export default Portal
