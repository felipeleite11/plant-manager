import React, { useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import * as Notification from 'expo-notifications'

import { GlobalContextProvider } from './src/contexts/GlobalContext'

import Routes from './src/routes'

import { PlantProps } from './src/libs/storage'

export default function App() {
	const [loadedFonts] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold
	})

	useEffect(() => {
		const subscription = Notification.addNotificationReceivedListener(
			async notification => {
				const data = notification.request.content.data.plant as PlantProps

				console.log(data)
			}
		)

		return () => subscription.remove()
	}, [])

	if(!loadedFonts) {
		return <AppLoading />
	}

	return (
		<GlobalContextProvider>
			<Routes />
		</GlobalContextProvider>
	)
}
