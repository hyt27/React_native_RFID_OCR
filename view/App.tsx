//App.tsx
//主界面：Tab导航渲染
import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import IonIcons from 'react-native-vector-icons/Ionicons'
import RFIDPage from './RFIDPage';
import OCRPage from './OCRPage';
//import CommunityView from './CommunityView';
//import AchievementView from './AchievementView';
import SettingsView from './SettingsView';
//import Accept from './Accept';
//import { get, getDatabase, ref } from 'firebase/database';
//import app from '../db/dbConfig';
//import { retrieveUserInfo } from '../db/session';

//初始化按钮导航栏
const Tab = createBottomTabNavigator();

const App = ({navigation}) => {
  /*const [currentComponent, setCurrentComponent] = useState("");
  
  const acceptTask = (id) => {
    setCurrentComponent(id)
  }

  const database = getDatabase(app)
  const getTask = async () => {
    //TODO 四点更新，但无法做到，因为google cloud function不免费提供（属于外界因素）
    const phone = await retrieveUserInfo("phone")
    const todayTaskRef = ref(database, "users/" + phone + "/todayTask")
    const todayTaskSnapshot = await get(todayTaskRef)
    setCurrentComponent(todayTaskSnapshot.val())
  }

  useEffect(() => {
    getTask()
}, []);*/


  return(
      <Tab.Navigator
        screenOptions={({route}) => ({
          // 导航切换
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            if (route.name === 'RFID'){
              iconName = focused ? 'scan-circle' : 'scan-circle-outline';
            }else if(route.name === 'OCR'){
              iconName = focused ? 'people-circle' : 'people-circle-outline'
            //}else if(route.name === 'achievements'){
            //  iconName = focused ? 'ribbon' : 'ribbon-outline'
            }else if(route.name === 'settings'){
              iconName = focused ? 'settings' : 'settings-outline'
            }
            return <IonIcons name={iconName} size={size} color={color}></IonIcons>
          },
          tabBarActiveTintColor: '#2775b6',
          tarBarInactiveTintColor: '#e2e1e4',
          headerTitleAlign: "center"
        })}
      >
        {/* <Tab.Screen name='task' >
          {props => (
            <View>
              {currentComponent === "" ? <TaskView onSendValue={acceptTask}/> : <Accept taskid={currentComponent}/>}
            </View>
          )}
        </Tab.Screen>
        <Tab.Screen name='achievements' component={AchievementView}></Tab.Screen>
        */}
        {/* Tab型导航，name为路由名，component是渲染的组件 */}
        <Tab.Screen name='RFID' component={RFIDPage}></Tab.Screen>
        <Tab.Screen name='OCR' component={OCRPage}></Tab.Screen>
        <Tab.Screen name='settings'component={SettingsView}></Tab.Screen>
      </Tab.Navigator>
  ) ;
}

export default App;
