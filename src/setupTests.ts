// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'

jest.mock('idb-keyval', () => ({ set: jest.fn(), get: jest.fn() }))
