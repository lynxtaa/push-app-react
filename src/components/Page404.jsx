import React from 'react'
import { Redirect } from 'react-router'
import { loadState } from '../store/localStorage'

const Page404 = () => {
	const { day, week } = loadState()

	return <Redirect to={`/${week || 1}/${day || 1}`} />
}

export default Page404
