import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket',
    ' AsyncStorage '
])

import Routes from './routes';

export default function app() {
    return <Routes />
}