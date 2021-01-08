import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {
  const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta); '
  const [error, setError] = useState(false);
  const [loaded, setLoad] = useState(false);
  const URL = "http://192.168.4.1";
  if (error) {
    let interval = setInterval(async () => {
      console.log('try');
      fetch(URL)
      .then(response => {
        if (response.ok) {
          clearInterval(interval);
          setLoad(true);
          setError(false);
        }
      })
      .catch(error => {
        setError(true);
        setLoad(false);
        console.log('ERROR');
      })
    }, 3000);
    return (
      <View style={styles.container}>
        <Image
          style={styles.errorImage}
          source={require('./assets/connection.png')}
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
            <View style={styles.container}>
              <Image
                style={styles.errorImage}
                source={require('./assets/connection.png')}
              />
            </View>
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{
              uri: URL
            }}
            cacheEnabled={false}
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

