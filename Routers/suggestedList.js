const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('underscore');
const SuggestedList = require('../Models/SuggestedList');
const Products = require('../Models/Products');


//Views all of the suggested lists
router.get('/view', async (req,res)=> {
        const suggestedList = await SuggestedList.find();
        const productsList = _.pluck(suggestedList, "products");

        //Loopings to get and calculate amounts of the pack
        var p=[],amount=[];
        for(let i=0; i<productsList.length; i++){
           p[i]=productsList[i];
            var idList=[],quantities=[],total=0, prices=[];

            for (let j=0; j<p[i].length;j++){
                idList[j]=p[i][j]._id;
                quantities[j]=p[i][j].quantity;
            }
           for(let k=0; k<idList.length;k++){
               const p=await Products.findById('5ea1f57505acfb3e20ccbf21').select('pricePerUnit');
                prices[k]=p.pricePerUnit;
                total=total+prices[k]*quantities[k];
           }
       
           amount[i]=total;

        } 
        //End of the loop to get amounts of the respective packs
        console.log(amount);
        
        
        
});

//Save a new pack to the database
router.post('/add', async (req,res) =>{

    const suggestedList = new SuggestedList({
        _id: new mongoose.Types.ObjectId,
        name : req.body.name,
        discount : req.body.discount,
        availability : req.body.availability,
        products : req.body.products
    });
    try{
        const savedSuggestedList = await suggestedList.save();
        res.json(savedSuggestedList);
    }catch(err){
        res.json({message: err});
    }  
      
});

//Delete a pack from the database

router.delete('/delete/:packID', async (req,res) =>{
    try{

        const deletedSuggestedList = await SuggestedList.deleteOne({_id : req.params.packID});
        res.json(deletedSuggestedList);

    }catch(err){
        res.json({message: err});
    }
});


//Edit a pack 
router.patch('/edit/:packID', async (req,res) => {
try{
  const editedpack = await SuggestedList.update({_id: req.params.packID}, {$set:{
        name : req.body.name,
        discount : req.body.discount,
        availability : req.body.availability,
        products : req.body.products
        }});
        res.json(editedpack);
}catch(err){
    res.json({message : err});
}

});


module.exports=router;