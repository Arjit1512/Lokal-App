import { Tabs } from "expo-router";
import {Entypo, Feather} from '@expo/vector-icons';


export default function TabsLayout(){
  return (
    <Tabs>
      <Tabs.Screen name='Jobs' options={{headerShown: false , 
        tabBarIcon: ({size,color}) => 
          <Feather name='search' size={size} color={color} />
      }} />
      <Tabs.Screen name='Bookmarks' options={{headerShown: false , 
        tabBarIcon: ({size,color}) => 
          <Entypo name='bookmark' size={size} color={color} />
      }} />
      
    </Tabs>
  )
}