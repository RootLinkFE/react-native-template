/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { name as appName } from './app.json';
import App from './src/Entrypoint';
import './src/lib/globalFunction';

enableScreens();

AppRegistry.registerComponent(appName, () => App);
