import { model, Schema, Types } from 'mongoose'

export interface Product {
  name: string
  description?: string
  img?: string
  price: number
  sku: string
  qty: number
}

export interface Order {
  number: string
  cashier: string
  items: Array<Types.ObjectId> | Array<Product>
  created_at: Date
  closed: boolean
}

const productScema = new Schema<Product>({
  name: String,
  description: String,
  img: String,
  price: Number,
  sku: String,
  qty: {
    type: Number,
    default: 0,
  },
})

const orderSchema = new Schema<Order>(
  {
    number: Number,
    cashier: String,
    items: [
      {
        type: Types.ObjectId,
        ref: 'Product',
      },
    ],
    date: Date,
    closed: Boolean,
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
)

export const ProductModel = model<Product>('Product', productScema)
export const OrderModel = model<Order>('Order', orderSchema)
