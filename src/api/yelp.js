import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer sRsCryLktqrUZq52yjWSqop29lj7yHuxQc4mjiGPVxfeI0o9gWaQjYVc9W4o6isMnvHcHDAESFUPm2fce3SI7P6Jye5Hp9IV3sRIdbqRLN5EjKPYvRUvpAqV-CQGYXYx'
  }
})
