import schedule from './schedule'

export const getSets = (week, day) => schedule
	.find(({ weekNum }) => weekNum == week).days[day - 1]
	.map((set, i) => ({ id: `${week}-${day}-${i}`, set }))

export const getWeekNums = () => schedule.map(({ weekNum }) => weekNum)
