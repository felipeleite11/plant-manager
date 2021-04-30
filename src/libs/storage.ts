import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'

export interface PlantProps {
	id: number
	name: string
	about: string
	photo: string
	environments: string[]
	water_tips: string
	frequence: {
		times: number,
		repeat_every: string
	}
	dateTimeNotification: Date
	hour: string
}

export interface StoragePlantProps {
	[id: string]: {
		data: PlantProps
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
	
			const newPlant = {
				[plant.id]: {
					data: plant
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
	
			const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}
	
			delete oldPlants[plant.id]
	
			console.log(`Restam ${Object.keys(oldPlants).length} plantas`)
	
			await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(oldPlants))
		} catch(e) {
			throw new Error(e)
		}
	},
	
	async removePlants() {
		try {
			await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify([]))
		} catch(e) {
			throw new Error(e)
		}
	}
}

