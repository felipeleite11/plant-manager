import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../components/Header'

import colors from '../styles/colors'

import drop from '../assets/waterdrop.png'

import { PlantProps, loadPlants } from '../libs/storage'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'

export function MyPlants() {
	const [plants, setPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [nextWatered, setNextWatered] = useState<string>()

	useEffect(() => {
		async function loadStoragedData() {
			const storagedPlants = await loadPlants()

			const nextTime = formatDistance(
				new Date(storagedPlants[0].dateTimeNotification).getTime(),
				new Date().getTime(),
				{ locale: ptBR }
			)

			setNextWatered(`Não esqueça de regar a ${storagedPlants[0].name} às ${nextTime} horas.`)

			setPlants(storagedPlants)
			setLoading(false)
		}

		loadStoragedData()
	}, [])

	return (
		<View style={styles.container}>
			<Header />

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
				<Text style={styles.plantsText}>
					Próximas regadas
				</Text>

				{loading ? (
					<ActivityIndicator color={colors.green} />
				) : (
					<FlatList
						data={plants}
						keyExtractor={item => String(item.id)}
						renderItem={({ item }) => (
							<PlantCardSecondary 
								data={item}
							/>
						)}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>
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
	plantsText: {
		fontSize: 24,
		fontFamily: fonts.heading,
		color: colors.heading,
		marginVertical: 20
	}
})