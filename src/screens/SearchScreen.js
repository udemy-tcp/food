import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar'
import useResults from '../hooks/useResults'
import ResultsList from '../components/ResultsList'
import LottieView from 'lottie-react-native'
import AutoUpdateService from '../services/AutoUpdateService'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage, loading] = useResults()

  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$'
    return results.filter((result) => {
      return result.price === price
    })
  }

  useEffect(() => {
    AutoUpdateService.autoUpdate()
  }, [])

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {loading ? (
        <LottieView
          source={require('../../assets/lottie/67226-food-app-interaction.json')}
          autoPlay={true}
          loop
          speed={2.5}
        />
      ) : (
        <View style={styles.containerStyle}>
          {errorMessage ? <Text>{errorMessage}</Text> : null}
          <ScrollView>
            <ResultsList
              results={filterResultsByPrice('$')}
              title="Cost Effective"
            />
            <ResultsList
              results={filterResultsByPrice('$$')}
              title="Bit Pricier"
            />
            <ResultsList
              results={filterResultsByPrice('$$$')}
              title="Big Spender"
            />
          </ScrollView>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#F0EEEE',
    flex: 1
  }
})

export default SearchScreen
