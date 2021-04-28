import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View, StyleSheet, Image } from 'react-native'
import colors from '../styles/colors'

import fonts from '../styles/fonts'

interface HeaderProps {
	imageUrl?: string
}

const photoProfile = 'https://avatars.githubusercontent.com/u/54327441?v=4'

export function Header({ imageUrl = photoProfile }: HeaderProps) {
	const [userName, setUserName] = useState('')

	useEffect(() => {
		async function loadStoredUserName() {
			const user = await AsyncStorage.getItem('@plantmanager:user')
			setUserName(user || '')
		}

		loadStoredUserName()
	}, [])

	return (
		<View style={styles.container}>
			
			<View>
				<Text style={styles.greeting}>Olá,</Text>
				<Text style={styles.name}>{userName}</Text>
			</View>

			<Image source={{ uri: imageUrl }} style={styles.photo} />

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 20,
		paddingTop: 50
	},
	greeting: {
		fontSize: 32,
		fontFamily: fonts.text,
		color: colors.heading
	},
	name: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 40,
		fontFamily: fonts.heading,
		color: colors.heading
	},
	photo: {
		width: 80,
		height: 80,
		borderRadius: 40
	}
})