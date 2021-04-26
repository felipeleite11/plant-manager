import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useRoute } from '@react-navigation/core'

import drop from '../assets/waterdrop.png'
import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
	plant: {
		id: number,
		name: string,
		photo: string,
		environments: string[],
		about: string,
		water_tips: string
	}
}

export function PlantSave() {
	const { params } = useRoute()

	const { plant } = params as Params

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<SvgFromUri 
					uri={plant.photo}
					height={150}
					width={150}
				/>

				<Text style={styles.name}>
					{plant.name}
				</Text>

				<Text style={styles.about}>
					{plant.about}
				</Text>
			</View>

			<View style={styles.controller}>
				<View style={styles.tip}>
					<Image 
						source={drop}
						style={styles.tipImage} 
					/>

					<Text style={styles.tipText}>
						{plant.water_tips}
					</Text>
				</View>

				<Text style={styles.alert}>
					Escolha o melhor horário para ser lembrado.
				</Text>

				<Button text="Cadastrar planta" onPress={() => {}} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.shape
	},
	header: {
		flex: 1,
		paddingHorizontal: 30,
		paddingVertical: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.shape
	},
	name: {
		fontFamily: fonts.heading,
		fontSize: 24,
		color: colors.heading,
		marginTop: 15
	},
	about: {
		textAlign: 'center',
		fontFamily: fonts.heading,
		color: colors.heading,
		fontSize: 17,
		marginTop: 15
	},
	controller: {
		backgroundColor: colors.white,
		padding: 20
	},
	tip: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.blue_light,
		padding: 20,
		borderRadius: 20,
		position: 'relative',
		bottom: 60
	},
	tipImage: {
		width: 56,
		height: 56
	},
	tipText: {
		flex: 1,
		marginLeft: 20,
		fontFamily: fonts.text,
		color: colors.blue,
		textAlign: 'justify'
	},
	alert: {
		textAlign: 'center',
		fontFamily: fonts.complement,
		color: colors.heading,
		fontSize: 12,
		marginBottom: 5
	}
})