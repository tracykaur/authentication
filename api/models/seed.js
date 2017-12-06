const Product = require('./Product')

Product.create([
  { brandName: 'Coca Cola', name: '390ml Glass Bottle Coke' },
  { brandName: 'Coca Cola', name: '390ml Glass Bottle Fanta' },
  { brandName: 'Coca Cola', name: '390ml Glass Bottle Sprite' }
])
  .then((products) => {
    console.log('Created!', products)
  })
  .catch((error) => {
    console.log('Unable to seed products!', error)
  })
