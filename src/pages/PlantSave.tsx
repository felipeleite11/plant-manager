import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Platform, Alert, TouchableOpacity } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core'
import { format, isBefore } from 'date-fns'
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker'

import drop from '../assets/waterdrop.png'

import { Button } from '../components/Button'

import { PlantProps, savePlant } from '../libs/storage'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
	plant: PlantProps
}

export function PlantSave() {
	const { navigate } = useNavigation()

	const { params } = useRoute()

	const { plant } = params as Params

	const [selectedTime, setSelectedTime] = useState<Date | null>(null)
	const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios')

	function handleChangeTime(_: DateTimePickerEvent, datetime: Date | undefined) {
		if(Platform.OS === 'android') {
			setShowTimePicker(old => !old)
		}

		if(datetime && isBefore(datetime, new Date())) {
			setSelectedTime(new Date())
			return Alert.alert('Este horário já passou.')
		}

		if(datetime) {
			setSelectedTime(datetime)
			setShowTimePicker(false)
		}
	}

	// Android only
	function handleOpenTimePicker() {
		setShowTimePicker(old => !old)
	}

	async function handleSavePlant() {
		if(!selectedTime) {
			return Alert.alert('Primeiro selecione um horário para o lembrete.')
		}

		try {
			await savePlant({
				...plant,
				dateTimeNotification: selectedTime
			})

			navigate('Confirmation', {
				title: 'Tudo certo!',
				subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
				buttonText: 'Ver minhas plantas',
				nextScreen: 'TabRoutes',
				icon: '😁'
			})
		} catch {
			Alert.alert('Não foi possível salvar a planta.')
		}
	}

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

				<Text style={styles.helpText}>
					Escolha o melhor horário para ser lembrado.
				</Text>

				{showTimePicker && (
					<DateTimePicker 
						value={selectedTime || new Date()}
						mode="time"
						display="spinner"
						onChange={handleChangeTime}
					/>
				)}

				{Platform.OS === 'android' && (
					<TouchableOpacity 
						onPress={handleOpenTimePicker}
						style={styles.timePickerButton}
					>
						<Text style={styles.timePickerText}>
							{selectedTime ? format(selectedTime || new Date(), 'HH:mm') : `Definir horário`}
						</Text>

						{selectedTime && (
							<Text style={styles.timePickerChangeText}>
								Toque aqui para alterar
							</Text>
						)}
					</TouchableOpacity>
				)}

				<Button 
					text="Adicionar planta" 
					onPress={handleSavePlant}
					style={[
						styles.submitButton,
						selectedTime && { bottom: 35 }
					]} 
				/>
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
		paddingTop: 50,
		paddingBottom: 100,
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
		padding: 20,
		flex: 1
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
	helpText: {
		textAlign: 'center',
		fontFamily: fonts.complement,
		color: colors.heading,
		fontSize: 12,
		bottom: 30
	},
	timePickerButton: {
		width: '100%',
		alignItems: 'center',
		paddingVertical: 20,
		bottom: 30
	},
	timePickerText: {
		color: colors.heading,
		fontSize: 26,
		fontFamily: fonts.text
	},
	timePickerChangeText: {
		color: colors.heading,
		fontSize: 12,
		fontFamily: fonts.text
	},
	submitButton: {
		bottom: 20
	}
})