import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Confirmation() {
	const { navigate } = useNavigation()

	const [userName, setUserName] = useState('')

	useEffect(() => {
		async function loadStoredUserName() {
			const user = await AsyncStorage.getItem('@plantmanager:user')
			setUserName(user || '')
		}

		loadStoredUserName()
	}, [])

	function handleMoveOn() {
		navigate('PlantSelect')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>
					😁
				</Text>

				<Text style={styles.title}>
					Prontinho, {userName}!
				</Text>

				<Text style={styles.subtitle}>
					Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
				</Text>

				<View style={styles.footer}>
					<Button 
						text="Começar" 
						onPress={handleMoveOn} 
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		padding: 30
	},
	emoji: {
		fontSize: 78		
	},
	title: {
		fontSize: 22,
		fontFamily: fonts.heading,
		textAlign: 'center',
		color: colors.heading,
		lineHeight: 38,
		marginTop: 15
	},
	subtitle: {
		fontSize: 17,
		fontFamily: fonts.text,
		textAlign: 'center',
		paddingVertical: 10,
		color: colors.heading
	},
	footer: {
		width: '100%',
		paddingHorizontal: 50,
		marginTop: 20
	}
})