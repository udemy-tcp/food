import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Rating } from 'react-native-ratings'
import ReviewesList from './ReviewsList'

const Detail = ({ result, reviews }) => {
  const onCall = async () => {
    let phoneNumber = result.phone
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${result.phone}`
    } else {
      phoneNumber = `tel:${result.phone}`
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available')
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch((err) => console.log(err))
  }

  const getCategories = (categories) => {
    return categories.map((category) => category.title).join(', ')
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.infoContainer}>
          <Text adjustsFontSizeToFit style={styles.title}>
            {result.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Rating
              style={styles.rating}
              type="custom"
              ratingColor="#D32F2F"
              readonly={true}
              startingValue={result.rating}
              ratingCount={5}
              imageSize={20}
            />
            <Text style={styles.review}>{result.review_count} Reviews</Text>
          </View>
          <Text style={styles.price}>{result.price}</Text>
          <Text style={styles.normalText}>
            {getCategories(result.categories)}
          </Text>
        </View>
        <View style={styles.infoButtonContainer}>
          <TouchableOpacity onPress={onCall}>
            <Feather name="phone-call" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="info" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Recommended Reviews</Text>
        <ReviewesList results={reviews.reviews} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EEEE',
    justifyContent: 'center'
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
    paddingHorizontal: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginVertical: 2
  },
  infoContainer: {
    flex: 1,
    marginBottom: 8
  },
  infoButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 8
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 2
  },
  review: {
    marginLeft: 4
  },
  normalText: {
    marginVertical: 2
  },
  price: {
    marginVertical: 2,
    fontWeight: 'bold'
  }
})

export default Detail
