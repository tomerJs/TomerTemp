import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const pdfUrl = "https://static.smokecheck.fr/cgu.pdf";
const PdfReader = ({ url: uri }) => <WebView originWhitelist={['*']} style={{ flex: 1 }} source={{ uri }} />

const LegalScreen = () =>  {
    return (
        <View style={styles.container}>
            <PdfReader url={pdfUrl} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});


export default LegalScreen
