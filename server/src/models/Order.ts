import { Schema, model, type Document } from 'mongoose';

export interface OrderDocument extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    status: OrderStatus;
    address: Address;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SCHEDULED = 'SCHEDULED',
    DENIED = 'DENIED',
    PAST = 'PAST'
}

export interface Address {
    city: string;
}

const addressSchema = new Schema<Address>(
    {
        city: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        }
    }
)

const orderSchema = new Schema<OrderDocument>(
    {
        firstName:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        lastName:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            required: true,
            default: OrderStatus.PENDING,
        },
        address: {
            type: addressSchema,
            required: true,
        }
    },
    {
        timestamps: true
    }
);
const Order =  model<OrderDocument>('Order', orderSchema);

export default Order;