import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feed from './pages/Feed';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

export default createAppContainer(
    createStackNavigator({
        
        Login,
        Cadastro,
        Feed,
        Upload, 
       
              
    }, {

        // defaultNavigationOptions: {
        //     headerTitle: 'Otakuapp',
        //     headerStyle: {
        //         backgroundColor: "#0288D1"
        //     },
        //     headerTintColor: "#000",
        //     headerBackTitle: null,
        // },
        //initialRouteName: 'Upload',
    })

);