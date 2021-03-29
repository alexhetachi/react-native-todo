import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Todo from '../todo/Todo';
// import React from 'react'
// import Header from '../shared/Header';
// import Home from '../home/Home';

const screens = {
    Todo: {
        screen: Todo
        // navigationOptions: ({ navigation }) => {
        //     return{
        //         headerTitle: () => <Header navigation = {navigation} title = 'Home'/>,
        //     } 
        // }
    }
}

const TodoStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerTitleAlign: 'center'
        // headerStyle: { backgroundColor:'#eee', height:60 }
    }
})

export default createAppContainer(TodoStack);