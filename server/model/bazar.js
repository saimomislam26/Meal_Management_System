const { Schema, model } = require('mongoose');
const {ObjectId} = Schema.Types
const autopopulate = require('mongoose-autopopulate')
const bazarSchema = new Schema({
    itemName:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    buyer:{
        type:ObjectId,
        ref:'user',
        autopopulate: {select: 'name'}
    }
},{ timestamps: true })

bazarSchema.plugin(autopopulate)
const Bazar = model('bazar', bazarSchema);

module.exports.Bazar = Bazar;