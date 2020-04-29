const express = require('express');
const router = express.Router();
const SuggestedList = require('../Models/SuggestedList');


//Views all of the suggested lists
router.get('/view', async (req,res)=> {
    try{
        const viewSuggestedList = await SuggestedList.find();
        res.json(viewSuggestedList);
    }catch(err){
        res.json({message: err});
    }
});

//Save a new pack to the database
router.post('/add', async (req,res) =>{

    const suggestedList = new SuggestedList({
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
        res.json({message: err});
    }

});


module.exports=router;