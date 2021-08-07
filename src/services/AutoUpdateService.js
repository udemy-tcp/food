import { Alert } from 'react-native'
import * as Updates from 'expo-updates'

const AutoUpdateService = {
  async autoUpdate() {
    const autoUpdatePromise = new Promise(async (resolve, reject) => {
      try {
        let response = {}

        try {
          response = await Updates.checkForUpdateAsync()
        } catch (error) {
          console.warn(error)
          const e = new Error(
            'Failed to check for newer versions of the app. To check again, please close and re-open the app.'
          )
          e.name = 'Update Error'
          throw error
        }

        const { isAvailable, manifest } = response

        if (isAvailable) {
          Alert.alert(
            'New Version Available',
            'A new version of this app is available. Press OK to update the app.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  try {
                    await Updates.fetchUpdateAsync()
                    await Updates.reloadAsync()
                    resolve()
                  } catch (error) {
                    console.log(error)
                    const e = new Error(
                      'Failed to update the app. Please try again later.'
                    )
                    e.name = 'Update Error'
                    Alert.alert(
                      e.name,
                      e.message,
                      [{ text: 'OK', onPress: () => reject(error) }],
                      { cancelable: false }
                    )
                  }
                }
              }
            ],
            { cancelable: false }
          )
        } else {
          resolve()
        }
      } catch (error) {
        console.log(error)
        setTimeout(() => {
          Alert.alert(
            error.name,
            error.message,
            [{ text: 'OK', onPress: () => reject(error) }],
            { cancelable: false }
          )
        }, 1000)
      }
    })

    return autoUpdatePromise
  }
}

export default AutoUpdateService
