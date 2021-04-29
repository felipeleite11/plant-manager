import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import { PlantSelect } from '../pages/PlantSelect'
import { MyPlants } from '../pages/MyPlants'

import colors from '../styles/colors'

const AppTab = createBottomTabNavigator()

const TabRoutes: React.FC = () => {
	// const [plantsLength, setPlantsLength] = useState<number>(0)

	// useEffect(() => {
	// 	async function loadPlantsLength() {
	// 		const storagedPlants = await loadPlants()

	// 		console.log(storagedPlants.length)

	// 		setPlantsLength(storagedPlants.length)
	// 	}

	// 	loadPlantsLength()
	// }, [])

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
			initialRouteName="MyPlants"
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
					// tabBarBadge: plantsLength > 0 ? plantsLength : undefined,
					// tabBarBadgeStyle: badgeStyles,
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