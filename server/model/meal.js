const { Schema, model } = require('mongoose');
const {ObjectId} = Schema.Types
const autopopulate = require('mongoose-autopopulate')
const mealSchema = new Schema({
    amount:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        required:true
    },
    eater:{
        type:ObjectId,
        ref:'user',
        autopopulate: {select: 'name'}
    }
},{ timestamps: true })

mealSchema.plugin(autopopulate)
const Meal = model('meal', mealSchema);

module.exports.Meal = Meal;