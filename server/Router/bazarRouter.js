const express = require('express');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();
const  { Bazar} = require('../model/bazar')
const auth = require('../Middleware/authorization')

app.use(cookieParser())


const addBazar = async (req,res) =>{
    const {itemName,amount,buyer,date} = req.body
    console.log(req.body);
    if(!itemName || !amount || !buyer ||!date){
        return res.status(400).json({message:"fill all the fields"})
    }
    const bazar = new Bazar({itemName,amount,buyer,date})

    const addBazar = await bazar.save()
    return res.status(200).send({data:addBazar})
}


const bazarTable = async(req,res)=>{
    
    var bazarTable = await Bazar.aggregate([
        {$project:{"amount":1,
                   "day":{$dayOfMonth:"$date"},
                   "month":{$month:"$date"}}},
        {$match:{"month":3}},
        {$group:{"_id":"$day",
                 "totalAmount":{$sum:"$amount"},
                 "day":{$first:"$day"},
                },
                 },
        {$project:{"_id":0,
                   "totalAmount":1,
                   "day":1}},
        {
            $sort:{
                day:1
            }
        }
        ])
        return res.status(200).send(bazarTable)   
}


router.route('/addbazar')
    .post(auth,addBazar)
router.route('/bazartable')
    .get(bazarTable)

module.exports = router