import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {
  const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta); '
  const [error, setError] = useState(false);
  const [loaded, setLoad] = useState(false);
  const URL = "http://192.168.0.103:8000";
  if (error) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.errorImage}
          source={require('./assets/error.jpg')}
        />
      </View>
    )
  } else {
    fetch(URL)
    .then(response => {
      if (response.ok) {
        setLoad(true);
      }
    })
    .catch(error => {
      setError(true);
    })

    return (
        !loaded ? (
            <View style={styles.container}><Text>Загразка...</Text></View>
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{
              uri: URL
            }}
            style={styles.webview}
            thirdPartyCookiesEnabled={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            renderError={() => setError(true)}
            injectedJavaScript={INJECTEDJAVASCRIPT}
            scrollEnabled
          />
        )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  webview: {
    marginTop: 35,
  }
});

