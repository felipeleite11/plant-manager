import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'

import notification from './notification' 

export interface PlantProps {
	id: number
	name: string
	about: string
	photo: string
	environments: string[]
	water_tips: string
	frequency: {
		times: number,
		repeat_every: string
	}
	dateTimeNotification: Date
	hour: string
}

export interface StoragePlantProps {
	[id: string]: {
		data: PlantProps
		notificationId: string
	}
}

export default {
	async saveUserName(userName: string) : Promise<void> {
		await AsyncStorage.setItem('@plantmanager:user', userName)
	},

	async loadUserName() : Promise<string> {
		const user = await AsyncStorage.getItem('@plantmanager:user')

		return user || ''
	},

	async savePlant(plant: PlantProps) : Promise<void> {
		try {
			const data = await AsyncStorage.getItem('@plantmanager:plants')
	
			const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

			const notificationId = await notification.scheduleNotification(plant)
	
			const newPlant = {
				[plant.id]: {
					data: plant,
					notificationId
				}
			}

			await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({
				...newPlant,
				...oldPlants
			}))
		} catch(e) {
			throw new Error(e)
		}
	},
	
	async loadPlants() : Promise<PlantProps[]> {
		try {
			const data = await AsyncStorage.getItem('@plantmanager:plants')
	
			const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
	
			const sortedPlants = Object.keys(plants)
				.map(plant => ({
					...plants[plant].data,
					hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
				}))
				.sort((a, b) => 
					Math.floor(
						new Date(a.dateTimeNotification).getTime() / 1000 -
						Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
					)
				)
	
			return sortedPlants
		} catch(e) {
			throw new Error(e)
		}
	},
	
	async removePlant(plant: PlantProps) : Promise<void> {
		try {
			const data = await AsyncStorage.getItem('@plantmanager:plants')

			const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
	
			await notification.cancelScheduledNotificationAsync(plants[plant.id].notificationId)

			delete plants[plant.id]

			await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))
		} catch(e) {
			throw new Error(e)
		}
	},
	
	async removePlants() {
		try {
			const data = await AsyncStorage.getItem('@plantmanager:plants')

			const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

			for(let { notificationId } of Object.values(plants)) {
				await notification.cancelScheduledNotificationAsync(notificationId)
			}

			await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({}))
		} catch(e) {
			throw new Error(e)
		}
	}
}

