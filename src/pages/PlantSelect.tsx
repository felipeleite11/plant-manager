import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Header } from '../components/Header'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import api from '../services/api'

import { EnvironmentButton } from '../components/EnvironmentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'

import photo from '../assets/user.png'

interface EnvironmentProps {
	key: string,
	title: string
}

interface PlantProps {
	id: number,
	name: string,
	photo: string,
	environments: string[]
}

export function PlantSelect() {
	const { navigate } = useNavigation()

	const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
	const [selectedEnvironment, setSelectedEnvironment] = useState('all')
	const [plants, setPlants] = useState<PlantProps[]>([])
	const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [loadMore, setLoadMore] = useState(true)
	const [loadedAll, setLoadedAll] = useState(false)

	async function fetchPlants() {
		const { data } = await api.get('plants', {
			params: {
				_sort: 'name',
				_order: 'asc',
				_page: page,
				_limit: 8
			}
		})

		if(!data) {
			setLoadedAll(true)
		}

		if(page > 1) {
			setPlants(old => [...old, ...data])
		} else {
			setPlants(data)
			setFilteredPlants(data)
		}
		
		setLoading(false)
		setLoadMore(false)
	}

	useEffect(() => {
		async function fetchEnvironments() {
			const { data } = await api.get('plants_environments', {
				params: {
					_sort: 'title',
					_order: 'asc'
				}
			})

			setEnvironments([
				{
					key: 'all',
					title: 'Todos'
				},
				...data
			])
		}

		fetchEnvironments()
	}, [])

	useEffect(() => {
		fetchPlants()
	}, [])

	function handleEnvironmentSelect(environment: EnvironmentProps) {
		setSelectedEnvironment(environment.key)

		if(environment.key === 'all') {
			setFilteredPlants(plants)
		} else {
			setFilteredPlants(plants.filter(plant => plant.environments.includes(environment.key)))
		}
	}

	function handleFetchMore(distance: number) {
		if(distance < 1 || loadedAll) {
			return
		}

		setLoadMore(true)
		setPage(old => old + 1)
		fetchPlants()
	}

	function handlePlantSelect(plant: PlantProps) {
		navigate('PlantSave', { plant })
	}

	if(loading) {
		return <Load />
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header imageUrl={photo} />

				<Text style={styles.title}>
					Em qual ambiente
				</Text>
				<Text style={styles.subtitle}>
					você quer colocar sua planta?
				</Text>
			</View>

			<View>
				<FlatList 
					data={environments}
					keyExtractor={item => String(item.key)}
					renderItem={({ item }) => (
						<EnvironmentButton 
							text={item.title}
							active={selectedEnvironment === item.key}
							onPress={() => handleEnvironmentSelect(item)}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.environmentButtonsContainer}
				/>
			</View>

			<View style={styles.plantListContainer}>
				<FlatList 
					data={filteredPlants}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<PlantCardPrimary 
							data={item}
							onPress={() => { handlePlantSelect(item) }} 
						/>
					)}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					onEndReachedThreshold={0.1}
					onEndReached={({ distanceFromEnd }) => { handleFetchMore(distanceFromEnd) }}
					ListFooterComponent={
						loadMore ?<ActivityIndicator color={colors.green} /> : <></>
					}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		justifyContent: 'center',
	},
	header: {
		paddingHorizontal: 30
	},
	title: {
		fontSize: 17,
		color: colors.heading,
		fontFamily: fonts.heading,
		lineHeight: 20,
		marginTop: 15
	},
	subtitle: {
		fontFamily: fonts.text,
		fontSize: 17,
		lineHeight: 20,
		color: colors.heading
	},
	environmentButtonsContainer: {
		height: 44,
		justifyContent: 'center',
		margin: 32
	},
	plantListContainer: {
		flex: 1,
		paddingHorizontal: 22,
		justifyContent: 'center'
	}
})