import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { 
	Text,
	Image,
	StyleSheet,
	SafeAreaView,
	View,
	TouchableOpacity,
	Dimensions 
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as Notification from 'expo-notifications'

import { GlobalContext } from '../contexts/GlobalContext'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import watering from '../assets/water.png'

export function Welcome() {
	const { navigate } = useNavigation()

	const { userName, setUser } = useContext(GlobalContext)
	
	useEffect(() => {
		async function loadStoredUserName() {
			// await AsyncStorage.removeItem('@plantmanager:user')
			// await AsyncStorage.removeItem('@plantmanager:plants')

			// await Notification.cancelAllScheduledNotificationsAsync()

			// await setUser('Felipe')

			if(userName) {
				navigate('TabRoutes')
			}
		}

		loadStoredUserName()
	}, [])

	function handleStart() {
		navigate('UserIdentification')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>
					Gerencie{'\n'}
					suas plantas{'\n'}
					de forma fácil
				</Text>

				<Image 
					source={watering} 
					style={styles.image}
					resizeMode="contain"
				/>

				<Text style={styles.subtitle}>
					Não esqueça mais de regar suas plantas.
					Nõs cuidamos de lembrar você sempre que precisar.
				</Text>

				<TouchableOpacity 
					style={styles.button}
					activeOpacity={0.8}
					onPress={handleStart}
				>
					<Feather name="chevron-right" style={styles.buttonIcon} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	title: {
		fontSize: 32,
		textAlign: 'center',
		color: colors.heading,
		marginTop: 38,
		lineHeight: 34,
		fontFamily: fonts.heading
	},
	image: {
		height: Dimensions.get('window').width * 0.7
	},
	subtitle: {
		fontSize:18,
		textAlign: 'center',
		paddingHorizontal: 20,
		color: colors.heading,
		fontFamily: fonts.text
	},
	button: {
		backgroundColor: colors.green,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		marginBottom: 16,
		height: 56,
		width: 56
	},
	buttonIcon: {
		fontSize: 24,
		color: colors.white
	}
})