export async function getData(url) {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}
	return await response.json()
}

export const formatToDate = dateString => {
	if (!dateString || typeof dateString !== 'string') {
		return ''
	}

	const months = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд']

	const [day, month] = dateString.split('-')

	if (!day || !month || isNaN(parseInt(day)) || isNaN(parseInt(month))) {
		return ''
	}

	return `${parseInt(day)} ${months[parseInt(month) - 1] || ''}`
}

export const formatToStoreDate = input => {
	if (!input) return ''

	if (typeof input === 'string' && /^\d{2}\.\d{2}\.\d{4}$/.test(input)) {
		const [day, month, year] = input.split('.')
		return `${day}-${month}-${year}`
	}

	const date = input instanceof Date ? input : new Date(input)
	if (isNaN(date.getTime())) {
		console.error('Некорректная дата:', input)
		return ''
	}

	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()

	return `${day}-${month}-${year}`
}
