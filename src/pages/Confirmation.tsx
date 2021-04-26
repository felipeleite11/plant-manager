import React, { useContext } from 'react'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native'

import { Button } from '../components/Button'

import { GlobalContext } from '../contexts/GlobalContext'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation() {
	const { userName } = useContext(GlobalContext)

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
					<Button text="OK" />
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