import React from 'react'
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native'

import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
	text: string
}

export function Button({ text, style, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity 
			style={[
				styles.button,
				style
			]}
			activeOpacity={0.8}
			{...rest}
		>
			<Text style={styles.text}>
				{text}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.green,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		marginBottom: 16,
		paddingHorizontal: 16,
		height: 56,
	},
	text: {
		color: colors.white,
		fontSize: 16
	}
})