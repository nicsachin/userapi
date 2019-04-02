const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const con = mongoose.connect('mongodb://localhost:27017/project1', {useNewUrlParser: true})
           .then(console.log('connected'))

///////////////////schema/////////////////////////


const User = mongoose.model('User',new mongoose.Schema({
    id:{type:String,
        min:3,
        max:10
    },
    name:{type:String,
         min:4,
         max:20,
         trim:true,
         lowercase:true    
        },
    marks:{type:Number,
          min:0,
          max:100 

    },
    isIntelligent:{type:Boolean}
}))
   


////////////////////////////////////////////
///////////////////////////////////////////////////
// router.use('/',(req,res,next)=>{
//       next()
// })


router.get('/',(req,res)=>{
    User.find({},(err,data)=>{
        res.send(data)
    })
})

router.get('/:id',(req,res)=>{
       User.find({id:req.params.id},(err,data)=>{
            if(!Object.keys(data).length)
             res.send('please enter a valid id !!!')
             else
             res.send(data)
      })
    
})

router.post('/add/:id/:name/:marks/:isIntelligent',(req,res)=>{
    id = req.params.id
    name = req.params.name
    marks = req.params.marks
    isIntelligent = req.params.isIntelligent
    
    const user1 = new User({
         id:id,
         name:name,
         marks:marks,
         isIntelligent:isIntelligent
     })
      
      validate(user1)
      res.send('new user added')
           
})



/////////////////////////////////////////////////
async function validate(user,res)
{   
   user.validate((err)=>{
       if(!err)
        user.save()
       else
         res.send('error')
   })

}

router.delete('/delete/:id',(req,res)=>{
    
    async function deleteu()
    {
       const result = await User.deleteOne({id:req.params.id})
          if(result.n>0)
            res.send('user deleted successfully')
            else
             res.send('no user found please enter a valid id')
    }
    deleteu()
   
})

router.post('/update/:id1/:id2/:name/:marks/:isIntelligent',(req,res)=>{
    id1 = req.params.id1
    id2 = req.params.id2
    name = req.params.name
    marks = req.params.marks
    isIntelligent = req.params.isIntelligent
  
    async function update()
    {
        const result = await User.updateOne({id:id1},{
            $set:{
                name:name,marks:marks,id:id2,isIntelligent:isIntelligent
            }
        })
        if(result.n>0)
           res.send('user updates successfully')
           else
            res.send('please enter a valid id')
        // if(result.n==0)
        //  res.send(result)
        //  else
        //   res.send(new Error('please enter a valid id'))
    
    }
    update()

    
})


/////////////////exports///////////////

module.exports = router