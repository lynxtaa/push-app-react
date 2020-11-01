import '@testing-library/jest-dom/extend-expect'
import 'jest-date-mock'

import { server } from './jest/server'

jest.mock('idb-keyval')

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterEach(() => {
	sessionStorage.clear()
	localStorage.clear()
	server.resetHandlers()
})

afterAll(() => server.close())
