/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import CodePush from 'react-native-code-push';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };

export default class App extends Component<Props> {

 constructor(props) {
   super(props);
   this.state = { logs: [] };
 }
 codePushDownloadDidProgress(progress) {
       console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
 }

 componentWillMount() {
 		CodePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
 	}

 	componentDidMount(){
 		CodePush.allowRestart();//允许重启，否则热更新不会生效
 		CodePush.sync({
 			installMode: CodePush.InstallMode.IMMEDIATE,
 			updateDialog: false,
 		})
 	}

 codePushSync(){
   this.setState({ logs: ['Sync started at ' + new Date()]});
    CodePush.sync({
       installMode: CodePush.InstallMode.IMMEDIATE,
       updateDialog: true
    }, (status) => {
      for(var key in CodePush.SyncStatus) {
        if(status === CodePush.SyncStatus[key]) {
          this.setState({ logs: [...this.state.logs, key.replace(/_/g, '')]});
          break;
        }
      }

    });
 }
 render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Code Push updates 555
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <TouchableOpacity
          onPress={() => this.codePushSync()}
          style={[styles.button]}
        >
          <Text>
            CodePush Sync
          </Text>
        </TouchableOpacity>
        {this.state.logs.map((log, i) => <Text key={i}>{log}</Text>)}
      </View>
    );
  }
}

App = CodePush(codePushOptions) (App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    paddingVertical:  12,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor: "transparent"
  },
});
