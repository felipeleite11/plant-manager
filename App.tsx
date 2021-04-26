import React from 'react'
import AppLoading from 'expo-app-loading'
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'

import { GlobalContextProvider } from './src/contexts/GlobalContext'

import Routes from './src/routes'

export default function App() {
	const [loadedFonts] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold
	})

	if(!loadedFonts) {
		return <AppLoading />
	}

	return (
		<GlobalContextProvider>
			<Routes />
		</GlobalContextProvider>
	)
}
