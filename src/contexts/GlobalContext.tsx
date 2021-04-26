import React, { createContext, useState, ReactNode, useContext } from 'react'

interface GlobalContextProviderProps {
	children: ReactNode
}

interface GlobalContextProps {
	userName: string,
	setUserName: Function
}

export const GlobalContext = createContext({} as GlobalContextProps)

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
	const [userName, setUserName] = useState('')

	return (
		<GlobalContext.Provider value={{
			userName,
			setUserName
		}}>

			{children}

		</GlobalContext.Provider>
	)
}