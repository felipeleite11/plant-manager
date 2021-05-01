import * as Notification from 'expo-notifications'

import { PlantProps } from "./storage"

Notification.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false
	}),
})

export default {
	async cancelScheduledNotificationAsync(identifier: string) {
		await Notification.cancelScheduledNotificationAsync(identifier)

		console.log(`Notificação ${identifier} cancelada!`)
	},

	async scheduleNotification(plant: PlantProps) {
		const nextTime = new Date(plant.dateTimeNotification)
		const now = new Date()

		const { times, repeat_every } = plant.frequency

		if(repeat_every === 'week') {
			const interval = Math.trunc(7 / times)

			nextTime.setDate(now.getDate() + interval)
		} else {
			nextTime.setDate(nextTime.getDate() + 1)
		}

		const seconds = Math.floor(
			Math.abs(
				Math.ceil(nextTime.getTime() - now.getTime()) / 1000
			)
		)

		const notificationId = await Notification.scheduleNotificationAsync({
			content: {
				title: 'Hora de regar sua planta! 🌱',
				body: `Está na hora de regar ${plant.name}.`,
				sound: true,
				priority: Notification.AndroidNotificationPriority.HIGH,
				data: {
					plant
				},
				vibrate: [400]
			},
			trigger: {
				seconds: 10, //seconds < 60 ? 60 : seconds,
				repeats: true
			}
		})

		console.log(`Notificação ${notificationId} agendada para daqui a ${seconds} segundos.`)

		return notificationId
	}
}