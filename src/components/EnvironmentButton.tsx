import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentButtonProps extends RectButtonProps {
	text: string,
	active?: boolean
}

export function EnvironmentButton({ text, active = false, ...rest }: EnvironmentButtonProps) {
	return (
		<RectButton
			style={[
				styles.button,
				active && styles.active
			]} 
			{...rest}
		>
			<Text style={[
				styles.text,
				active && styles.active
			]}>
				{text}
			</Text>
		</RectButton>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.shape,
		height: 40,
		width: 76,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		marginRight: 5
	},
	active: {
		backgroundColor: colors.green_light,
		fontFamily: fonts.heading,
		color: colors.green_dark
	},
	text: {
		color: colors.heading,
		fontFamily: fonts.text
	}
})