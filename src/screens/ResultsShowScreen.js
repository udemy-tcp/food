import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native'
import yelp from '../api/yelp'
import CarouselCards from '../components/carousel/CarouselCards'

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null)
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    try {
      const response = await yelp.get(`/${id}`)
      setResult(response.data)
    } catch (err) {
      Alert.alert('Error', err)
    }
  }

  useEffect(() => {
    getResult(id)
  }, [])

  if (!result) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{result.name}</Text>
        <CarouselCards photos={result.photos} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})

export default ResultsShowScreen
