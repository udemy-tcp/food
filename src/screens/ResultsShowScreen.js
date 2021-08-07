import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Linking
} from 'react-native'
import yelp from '../api/yelp'
import CarouselCards from '../components/carousel/CarouselCards'

import Detail from '../components/restaurant/detail/Detail'

const ResultsShowScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [reviews, setReviews] = useState(null)
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    setLoading(true)
    try {
      const response = await yelp.get(`/${id}`)
      setResult(response.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      Alert.alert('Error', err)
    }
  }

  const getReviews = async (id) => {
    try {
      const response = await yelp.get(`/${id}/reviews`)
      setReviews(response.data)
    } catch (err) {
      Alert.alert('Error', err)
    }
  }

  const onRefresh = async () => {
    await getResult(id)
    await getReviews(id)
  }

  useEffect(() => {
    getResult(id)
    getReviews(id)
  }, [])

  if (!result || !reviews) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <CarouselCards photos={result.photos} />
        <Detail result={result} reviews={reviews} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EEEE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 8,
    marginHorizontal: 16
  }
})

export default ResultsShowScreen
