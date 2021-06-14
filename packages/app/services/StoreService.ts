import { Service } from '@app/services/Service'
import { Cashier, CashierModel, Product, ProductModel, Order, OrderModel } from '@shared/models'

import mongoose from 'mongoose'

export class StoreService extends Service {
  constructor() {
    super()
    mongoose.set('debug', true)

    mongoose.connect(
      'mongodb://localhost:27017/POS',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error(err)
          process.exit(-1)
        } else console.log('Connected to DB')
      }
    )
  }

  async createProduct(product: Product) {
    const saved = await new ProductModel(product).save()
    return saved.toObject()
  }

  async getProducts() {
    const items = await ProductModel.find()
    const clean = items.map((p) => p.toObject({ getters: true }))
    return clean
  }

  async createOrder(order: Order) {
    const saved = await new OrderModel(order).save()
    return saved.toObject()
  }

  async createCashier(cashier: Cashier) {
    const saved = await new CashierModel(cashier).save()
    return saved.toObject()
  }

  async getCashiers() {
    const items = await CashierModel.find()
    const clean = items.map((p) => p.toObject({ getters: true }))
    return clean
  }
}
