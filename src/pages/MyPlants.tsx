import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../components/Header'
import { PlantCardSecondary } from '../components/PlantCardSecondary'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import drop from '../assets/waterdrop.png'

import { Button } from '../components/Button'
import { GlobalContext } from '../contexts/GlobalContext'
import { PlantProps } from '../libs/storage'

export function MyPlants() {
	const { navigate } = useNavigation()

	const { myPlants, removeAllPlants, removeAPlant } = useContext(GlobalContext)

	const [nextWatered, setNextWatered] = useState<string>()

	useEffect(() => {
		if(myPlants.length) {
			const nextTime = formatDistance(
				new Date(myPlants[0].dateTimeNotification).getTime(),
				new Date().getTime(),
				{ locale: ptBR }
			)

			setNextWatered(`Não esqueça de regar a ${myPlants[0].name} às ${nextTime} horas.`)
		}
	}, [])

	async function handleClearPlants() {
		await removeAllPlants()
	}

	function handleTabChange() {
		navigate('NewPlant')
	}

	async function handleRemove(plant: PlantProps) {
		Alert.alert('Remover', `Deseja remover a planta ${plant.name}?`, [
			{
				text: 'Não',
				style: 'cancel'
			},
			{
				text: 'Sim',
				onPress: async () => {
					await removeAPlant(plant)
				}
			}
		])
	}

	return (
		<View style={styles.container}>
			<Header />

			{myPlants.length === 0 ? (
				<View style={styles.plantsEmptyArea}>
					<Text style={styles.plantsEmptyEmoji}>
						🍃
					</Text>

					<Text style={styles.plantsEmptyText}>
						Você ainda não tem nenhuma planta cadastrada.
					</Text>

					<Button 
						text="Cadastre sua primeira planta"
						onPress={handleTabChange}
					/>
				</View>
			) : (
				<>
					<View style={styles.spotLight}>
						<Image 
							source={drop} 
							style={styles.spotLightImage}
						/>

						<Text style={styles.spotLightText}>
							{nextWatered}
						</Text>
					</View>

					<View style={styles.plants}>
						<View style={styles.plantsHeader}>
							<Text style={styles.plantsText}>
								Próximas regadas
							</Text>

							<TouchableOpacity onPress={handleClearPlants}>
								<MaterialIcons 
									name="clear-all"
									size={30}
									color={colors.gray}
								/>
							</TouchableOpacity>
						</View>

						<FlatList
							data={myPlants}
							keyExtractor={item => String(item.id)}
							renderItem={({ item }) => (
								<PlantCardSecondary 
									data={item}
									handleRemove={() => { handleRemove(item) }}
								/>
							)}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		backgroundColor: colors.background,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	spotLight: {
		backgroundColor: colors.blue_light,
		paddingHorizontal: 20,
		borderRadius: 20,
		height: 110,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	spotLightImage: {
		width: 60,
		height: 60
	},
	spotLightText: {
		flex: 1,
		color: colors.blue,
		paddingHorizontal: 20
	},
	plants: {
		flex: 1,
		width: '100%'
	},
	plantsHeader: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	plantsEmptyArea: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	plantsEmptyEmoji: {
		fontSize: 64,
		color: colors.heading
	},
	plantsEmptyText: {
		color: colors.heading,
		textAlign: 'center',
		marginVertical: 50
	},
	plantsText: {
		fontSize: 24,
		fontFamily: fonts.heading,
		color: colors.heading,
		marginVertical: 20
	}
})