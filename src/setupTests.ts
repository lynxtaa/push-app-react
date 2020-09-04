import '@testing-library/jest-dom/extend-expect'

jest.mock('idb-keyval')

window.fetch = jest.fn().mockResolvedValue(null)
