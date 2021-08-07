import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Rating } from 'react-native-ratings'

const ResultsDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: result.image_url }} />
      <Text style={styles.name}>{result.name}</Text>
      <Rating
        style={styles.rating}
        type="custom"
        tintColor="#F0EEEE"
        ratingColor="#D32F2F"
        readonly={true}
        startingValue={result.rating}
        ratingCount={5}
        imageSize={20}
      />
      <Text>{result.review_count} Reviews</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold'
  },
  rating: {
    alignSelf: 'flex-start'
  }
})

export default ResultsDetail
