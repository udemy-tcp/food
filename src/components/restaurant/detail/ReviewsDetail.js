import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Rating } from 'react-native-ratings'
import { FontAwesome } from '@expo/vector-icons'

const ReviewesDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {result.user.image_url == null ? (
          <FontAwesome name="user-circle-o" size={50} color="black" />
        ) : (
          <Image style={styles.image} source={{ uri: result.user.image_url }} />
        )}
        <Text style={styles.name}>{result.user.name}</Text>
      </View>
      <Rating
        style={styles.rating}
        type="custom"
        ratingColor="#D32F2F"
        readonly={true}
        startingValue={result.rating}
        ratingCount={5}
        imageSize={20}
      />
      <View style={styles.review}>
        <Text>{result.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginVertical: 8
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginStart: 4,
    flex: 1
  },
  rating: {
    alignSelf: 'flex-start'
  },
  review: {
    flex: 1
  }
})

export default ReviewesDetail
