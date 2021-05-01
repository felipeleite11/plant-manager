import { format } from 'date-fns'
import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { Alert } from 'react-native'

import StorageOperations, { PlantProps } from '../libs/storage'

interface GlobalContextProviderProps {
	children: ReactNode
}

interface GlobalContextProps {
	userName: string
	setUser(name: string): void
	myPlants: PlantProps[]
	addPlant(plant: PlantProps): void
	removeAPlant(plant: PlantProps): void
	removeAllPlants(): void
	currentTab: string
	setCurrentTab(tabName: string): void
}

export const GlobalContext = createContext({} as GlobalContextProps)

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
	const [userName, setUserName] = useState('')
	const [myPlants, setMyPlants] = useState<PlantProps[]>([])
	const [currentTab, setCurrentTab] = useState('NewPlant')

	useEffect(() => {
		async function loadUserName() {
			const name = await StorageOperations.loadUserName()

			setUserName(name || '')

			console.log(`Usuário cadastrado: ${name}. [loadUserName]`)
		}

		loadUserName()
	}, [])

	useEffect(() => {
		async function loadStoragedPlants() {
			const storagedPlants = await StorageOperations.loadPlants()

			console.log(`${storagedPlants.length} plantas cadastradas. [loadStoragedPlants]`)

			setMyPlants(storagedPlants)
		}

		loadStoragedPlants()
	}, [])

	async function setUser(name: string) {
		StorageOperations.saveUserName(name)
		
		setUserName(name)

		console.log(`Definindo usuário: ${name}`)
	}

	async function addPlant(plant: PlantProps) {
		try {
			setMyPlants(oldPlants => [
				...oldPlants,
				{
					...plant,
					hour: format(new Date(plant.dateTimeNotification), 'HH:mm')
				}
			])
	
			console.log(`Adicionando planta: ${plant.name}`)
			
			await StorageOperations.savePlant(plant)
		} catch(e) {
			Alert.alert('Erro ao adicionar planta.')
		}
	}

	async function removeAPlant(plant: PlantProps) {
		try {
			await StorageOperations.removePlant(plant)
			
			setMyPlants(oldPlants => oldPlants.filter(p => p.id !== plant.id))
			
			console.log(`Removendo planta: ${plant.name}`)
		} catch(e) {
			console.log(e)
			
			Alert.alert('Erro ao remover o planta.')
		}
	}

	async function removeAllPlants() {
		try {
			await StorageOperations.removePlants()

			setMyPlants([])

			console.log('Todas as plantas foram removidas.')
		} catch {
			Alert.alert('Ocorreu um erro ao remover as plantas.')
		}
	}

	return (
		<GlobalContext.Provider value={{
			setUser,
			userName,
			myPlants,
			addPlant,
			removeAPlant,
			removeAllPlants,
			setCurrentTab,
			currentTab
		}}>

			{children}

		</GlobalContext.Provider>
	)
}