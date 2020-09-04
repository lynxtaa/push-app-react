import '@testing-library/jest-dom/extend-expect'
import 'jest-date-mock'

jest.mock('idb-keyval')

window.fetch = jest.fn().mockResolvedValue(null)
