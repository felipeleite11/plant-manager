import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
	title: string,
	subtitle: string,
	buttonText: string,
	icon: '😁' | '😁',
	nextScreen: string
}

export function Confirmation() {
	const { navigate } = useNavigation()

	const routes = useRoute()

	const {
		title,
		subtitle,
		buttonText,
		nextScreen,
		icon
	} = routes.params as Params

	function handleMoveOn() {
		navigate(nextScreen)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>
					{icon}
				</Text>

				<Text style={styles.title}>
					{title}
				</Text>

				<Text style={styles.subtitle}>
					{subtitle}
				</Text>

				<View style={styles.footer}>
					<Button 
						text={buttonText}
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