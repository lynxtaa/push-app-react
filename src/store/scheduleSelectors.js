import uuid from 'uuid'
import schedule from './schedule'

export const getSets = (week, day) => schedule
	.find(({ weekNum }) => weekNum == week).days[day - 1]
	.map(set => ({ id: uuid(), set }))

export const getWeekNums = () => schedule.map(({ weekNum }) => weekNum)
