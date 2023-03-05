const express = require('express');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();
const { Meal } = require('../model/meal')
const auth = require('../Middleware/authorization');
const { User } = require('../model/user');
const { Bazar } = require('../model/bazar');

app.use(cookieParser())


const addMeal = async (req, res) => {
    const { amount, eater, date } = req.body
    console.log(req.body);
    if (!amount || !eater || !date) {
        return res.status(400).json({ message: "fill all the fields" })
    }

    const meal = new Meal({ amount, eater, date })

    const addMeal = await meal.save()
    return res.status(200).send({ data: addMeal })
}
const showMeal = async (req, res) => {
    const presentTime = new Date();
    var LastDayMonth
    var FirstDayMonth
    const presentMonth = presentTime.getMonth();
    console.log(presentMonth);
    const presentYear = presentTime.getFullYear();
    console.log(presentYear);
    if (presentMonth < 9) {
      FirstDayMonth = `${presentYear}-0${presentMonth + 1}-01`;
      console.log(FirstDayMonth);
      LastDayMonth = `${presentYear}-0${presentMonth + 1}-30`;
      console.log(LastDayMonth);
    } else {
      FirstDayMonth = `${presentYear}-${presentMonth + 1}-01`;
      console.log(FirstDayMonth);
       LastDayMonth = `${presentYear}-${presentMonth + 1}-30`;
      console.log(LastDayMonth);
    }
    const result = await Meal.aggregate([
        {
            $addFields: {
                creationDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$date" },
                },
              },
        },

        {
            $match: {
                creationDate: {
                    $lte: LastDayMonth,
                    $gte: FirstDayMonth,
                  },
            }
        },
        {
            $group: {
                _id: "$eater",
                amount:{$sum:"$amount"}
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'_id',
                foreignField: "_id",
                as: "name"
            }
        },
        {
            $project:{
                _id:1,
                amount:1,
                name:{
                    name:1
                }
            }
        },

    ])
    const totalMeal = await Meal.aggregate([
        {
            $addFields: {
                creationDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$date" },
                },
              },
        },

        {
            $match: {
                creationDate: {
                    $lte: LastDayMonth,
                    $gte: FirstDayMonth,
                  },
            }
        },
        {
            $group: {
                _id: null,
                totalMeal:{$sum:"$amount"}
            }
        },
        {
            $project:{
                _id:1,
                totalMeal:1,

            }
        },

    ])

    const totalBazar = await Bazar.aggregate([
        {
            $addFields: {
                creationDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$date" },
                },
              },
        },
        {
            $match: {
                creationDate: {
                    $lte: LastDayMonth,
                    $gte: FirstDayMonth,
                  },
            }
        },
        {
            $group: {
                _id: null,
                amount:{$sum:"$amount"}
            }
        },
        {
            $project:{
                _id:1,
                amount:1,
               
            }
        },

    ])
        console.log("total Meal",totalMeal);
        const fullInfo = [
            {total:totalMeal[0].totalMeal},
            {totalBazar:totalBazar[0].amount},
            {
                result:result
            }
            
        ]
    res.status(200).send(fullInfo)
}

const mealTable = async(req,res)=>{
    var mealTable = await Meal.aggregate([
        {$project:{"amount":1,
                   "day":{$dayOfMonth:"$date"},
                   "month":{$month:"$date"}}},
        {$match:{"month":3}},
        {$group:{"_id":"$day",
                 "totalMeal":{$sum:"$amount"},
                 "day":{$first:"$day"},
                },
                 },
        {$project:{"_id":0,
                   "totalMeal":1,
                   "day":1}},
        {
            $sort:{
                day:1
            }
        }
        ])
        return res.status(200).send(mealTable)
   
    // .exec(function(err, transactions) {

    //     User.populate(transactions, {path: 'eater'}, function(err, populatedTransactions) {
    //         // Your populated translactions are inside populatedTransactions
    //         const result = [];
    //         var user =[]
    //         populatedTransactions.forEach((object) => {
    //             const existing = result.filter((item) => item.date == object.date);

    //             if (existing.length) {
    //                 const existingIndex = result.indexOf(existing[0]);
    //                 // var users = 
    //                 // var amount = 0
    //                 result[existingIndex].user = result[existingIndex].user.concat(object.eater);
    //             } else {
    //                 // if (typeof object.values == 'string') object.values = [object.values];
    //                 user.push(object);
    //                 result.push(user)
    //             }
    //         });
    //         return res.status(200).send(result)
    //         });
            
    // });
    // .populate(mealTable,{path:'user'})
    
}


router.route('/addmeal')
    .post(auth, addMeal)
router.route('/showmeal')
    .get(auth,showMeal)
router.route('/showmealtable')
    .get(auth,mealTable)

module.exports = router