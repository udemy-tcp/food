import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'

const SearchScreen = () => {
  const [term, setTerm] = useState('')

  return (
    <View style={styles.containerStyle}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => console.log('term was submitted')}
      />
      <Text>Search Screen</Text>
      <Text>{term}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    flex: 1
  }
})

export default SearchScreen
