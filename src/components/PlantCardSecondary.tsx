import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, StyleSheet, View, Animated, Vibration } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantProps extends RectButtonProps {
	data: {
		name: string,
		photo: string,
		hour: string
	}
	handleRemove: () => void
}

export function PlantCardSecondary({ data, handleRemove, ...rest }: PlantProps) {
	return (
		<Swipeable
			overshootRight={false}
			renderRightActions={() => (
				<Animated.View>
					<RectButton 
						style={styles.removeButton}
						onPress={handleRemove}
					>
						<Feather 
							name="trash" 
							size={32} 
							color={colors.white}
						/>
					</RectButton>
				</Animated.View>
			)}
			onSwipeableWillOpen={() => { 
				Vibration.vibrate(30) 
			}}
		>
			<RectButton 
				style={styles.container}
				{...rest}
			>
				<SvgFromUri 
					uri={data.photo} 
					width={50} 
					height={50} 
				/>

				<Text style={styles.text}>
					{data.name}
				</Text>

				<View style={styles.details}>
					<Text style={styles.timeLabel}>
						Regar às
					</Text>

					<Text style={styles.time}>
						{data.hour}
					</Text>
				</View>
			</RectButton>
		</Swipeable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingLeft: 10,
		paddingRight: 20,
		paddingVertical: 25,
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.shape,
		marginBottom: 10
	},
	text: {
		flex: 1,
		marginLeft: 10,
		fontFamily: fonts.heading,
		fontSize: 17,
		color: colors.heading
	},
	details: {
		alignItems: 'flex-end'
	},
	timeLabel: {
		fontSize: 16,
		fontFamily: fonts.text,
		color: colors.body_light
	},
	time: {
		marginTop: 5,
		fontSize: 16,
		fontFamily: fonts.heading,
		color: colors.body_dark
	},
	removeButton: {
		width: 100,
		height: 98,
		backgroundColor: colors.red,
		marginTop: 15,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		top: -14
	}
})