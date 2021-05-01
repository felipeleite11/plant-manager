import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Header } from '../components/Header'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import api from '../services/api'

import { PlantProps } from '../libs/Storage'

import { EnvironmentButton } from '../components/EnvironmentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'

interface EnvironmentProps {
	key: string,
	title: string
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
	const [allowLoadNextPage, setAllowLoadNextPage] = useState(true)

	async function fetchPlants() {
		if(!allowLoadNextPage) {
			return
		}

		const { data } = await api.get('plants', {
			params: {
				_sort: 'name',
				_order: 'asc',
				_page: page,
				_limit: 6
			}
		})
		
		if(!data.length) {
			setLoadedAll(true)
			setLoadMore(false)
		}

		if(page > 1) {
			setPlants(oldPlants => [...oldPlants, ...data])
		} else {
			setPlants(data)
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
		setFilteredPlants(plants)
	}, [plants])

	useEffect(() => {
		setAllowLoadNextPage(true)

		fetchPlants()

		return () => { setAllowLoadNextPage(false) }
	}, [page])

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
		setPage(page + 1)
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
				<Header />

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
					onEndReachedThreshold={0.5}
					onEndReached={({ distanceFromEnd }) => { handleFetchMore(distanceFromEnd) }}
					ListFooterComponent={
						loadMore ? <ActivityIndicator color={colors.green} /> : <></>
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
		margin: 32,
		paddingRight: 60
	},
	plantListContainer: {
		flex: 1,
		paddingHorizontal: 22,
		justifyContent: 'center'
	}
})