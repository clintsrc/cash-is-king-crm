import { Schema, model, type Document } from 'mongoose';

export interface OrderDocument extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    eventName: string;
    description: string;
    atmCount: number;
    startDate: Date;
    endDate: Date;
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
    street: string;
    zip: number;
}

const addressSchema = new Schema<Address>(
    {
        city: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        street: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        zip: {
            type: Number,
            required: true,
            minlength: 1,
            maxlength: 5,
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
        email:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],

        },
        phoneNumber:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 15,
            trim: true
        },
        eventName:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        description:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 1000, //this is roughly between 150 and 200 words.
            trim: true
        },
        atmCount:{
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        startDate:{
            type: Date,
            required: true,
            trim: true
        },
        endDate:{
            type: Date,
            required: true,
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

orderSchema.virtual('fullName').get(function(this: OrderDocument) {
    return `${this.firstName} ${this.lastName}`;
});

const Order =  model<OrderDocument>('Order', orderSchema);

export default Order;