import { model, Schema, Types } from 'mongoose'
import { Order } from '@shared/models'

export interface Cashier {
  name: string
  orders?: Array<Types.ObjectId> | Array<Order>
}

const cashierSchema = new Schema<Cashier>({
  name: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: Types.ObjectId,
      ref: 'Order',
    },
  ],
})

export const CashierModel = model<Cashier>('Cashier', cashierSchema)
