import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
    buyer: {type: Schema.Types.ObjectId,ref: "User"},
    stripeId: {type: String,required: true,unique: true},
    amount: {type: Number,required: true},
    plan: {type: String},
    credits: {type: Number},
    createdAt: {type: Date,default: Date.now},
});

const Transaction = models?.Transaction || model("Transaction", TransactionSchema)

export default Transaction