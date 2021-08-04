import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView
} from 'react-native'
import yelp from '../api/yelp'
import LottieView from 'lottie-react-native'

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    try {
      setLoading(true)
      const response = await yelp.get(`/${id}`)
      setResult(response.data)
      setLoading(false)
    } catch (err) {
      alert(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getResult(id)
  }, [])

  if (!result) {
    return null
  }

  return (
    <>
      {loading ? (
        <LottieView
          source={require('../../assets/lottie/67226-food-app-interaction.json')}
          autoPlay={true}
          loop
          speed={2.5}
        />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <Text>{result.name}</Text>
            <FlatList
              horizontal
              data={result.photos}
              keyExtractor={(photo) => photo}
              renderItem={({ item }) => {
                return <Image style={styles.image} source={{ uri: item }} />
              }}
            />
          </ScrollView>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 4
  }
})

export default ResultsShowScreen
