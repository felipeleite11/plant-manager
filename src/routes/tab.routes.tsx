import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import { PlantSelect } from '../pages/PlantSelect'
import { MyPlants } from '../pages/MyPlants'

import colors from '../styles/colors'

import { GlobalContext } from '../contexts/GlobalContext'

const AppTab = createBottomTabNavigator()

const TabRoutes: React.FC = () => {
	const { myPlants, currentTab } = useContext(GlobalContext)

	return (
		<AppTab.Navigator 
			tabBarOptions={{
				activeTintColor: colors.green,
				inactiveTintColor: colors.heading,
				labelPosition: 'beside-icon',
				style: {
					height: 64,
					justifyContent: 'flex-end'
				}
			}}
			initialRouteName={currentTab}
		>
			<AppTab.Screen
				name="NewPlant"
				component={PlantSelect}
				options={{
					title: 'Nova planta',
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons 
							name="add-circle-outline"
							size={size}
							color={color}
						/>
					)
				}}
			/>

			<AppTab.Screen
				name="MyPlants"
				component={MyPlants}
				options={{
					title: 'Minhas plantas',
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons 
							name="format-list-bulleted"
							size={size}
							color={color}
						/>
					),
					tabBarBadge: myPlants.length || undefined,
					tabBarBadgeStyle: badgeStyles,
					unmountOnBlur: true
				}}
			/>
		</AppTab.Navigator>
	)
}

const badgeStyles = {
	backgroundColor: colors.green_light,
	fontSize: 10
}

export default TabRoutes