import React from 'react'
import { Text, StyleSheet, Image } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
// import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantProps extends RectButtonProps {
	data: {
		name: string,
		photo: string
	}
}

export function PlantCardPrimary({ data, ...rest }: PlantProps) {
	return (
		<RectButton 
			style={styles.container}
			{...rest}
		>
			{/* <SvgFromUri uri={data.photo} width={70} height={70} /> */}

			<Image 
				source={{ uri: data.photo }}
				style={styles.photo} 
			/>

			<Text style={styles.text}>{data.name}</Text>
		</RectButton>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxWidth: '45%',
		backgroundColor: colors.shape,
		borderRadius: 20,
		paddingVertical: 10,
		alignItems: 'center',
		margin: 10,
		minHeight: 140
	},
	text: {
		color: colors.green_dark,
		fontFamily: fonts.heading,
		marginVertical: 16
	},
	photo: {
		width: 80, 
		height: 80, 
		borderRadius: 40
	}
})