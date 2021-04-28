import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Text, StyleSheet, SafeAreaView, View, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {
	const { navigate } = useNavigation()

	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const [name, setName] = useState<string>()
	
	function handleBlur() {
		setIsFocused(false)
	}

	function handleFocus() {
		setIsFocused(true)
	}

	function handleInputChange(value: string) {
		setIsFilled(!!value)
		setName(value)
	}

	async function handleStart() {
		if(!name) {
			return Alert.alert('Me diga seu nome, por favor. 🙄')
		}

		try {
			await AsyncStorage.setItem('@plantmanager:user', name)

			navigate('Confirmation', {
				title: `Prontinho, ${name}!`,
				subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
				buttonText: 'Começar',
				nextScreen: 'PlantSelect',
				icon: '😁'
			})
		} catch {
			Alert.alert('Não foi possível salvar seu nome. Verifique as permissões e tente novamente.')
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView 
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.content}>
						<View style={styles.form}>

							<View style={styles.header}>
								<Text style={styles.emoji}>
									{isFilled ? '😁' : '😏'}
								</Text>

								<Text style={styles.title}>
									Como podemos {'\n'}
									chamar você?
								</Text>
							</View>

							<TextInput 
								style={[
									styles.input,
									(isFocused || isFilled) && { 
										borderBottomColor: colors.green,
										borderBottomWidth: 2 
									}
								]}
								placeholder="Digite seu nome"
								onBlur={handleBlur}
								onFocus={handleFocus}
								onChangeText={handleInputChange}
							/>

							<View style={styles.footer}>
								<Button text="Começar" onPress={handleStart} />
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	content: {
		flex: 1,
		width: '100%'
	},
	form: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 54,
		alignItems: 'center'
	},
	header: {
		alignItems: 'center'
	},
	emoji: {
		fontSize: 44
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		color: colors.heading,
		fontFamily: fonts.heading,
		lineHeight: 32,
		marginTop: 20
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: colors.gray,
		color: colors.heading,
		width: '100%',
		fontSize: 18,
		marginTop: 50,
		padding: 10,
		textAlign: 'center'
	},
	footer: {
		marginTop: 40,
		width: '100%',
		paddingHorizontal: 20
	}
})
