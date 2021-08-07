import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ReviewesDetail from './ReviewsDetail'

const ReviewesList = ({ results }) => {
  if (!results.length) {
    return null
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return <ReviewesDetail result={item} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8
  }
})

export default ReviewesList
