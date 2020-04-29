const express = require('express');
const router = express.Router();
const FavouriteList = require('../Models/FavouriteList');

//Request all the favourite packs from the database (For Admins)
router.get('/view', async(req,res)=> {
    try{
        const viewFavouriteList = await FavouriteList.find();
        res.json(viewFavouriteList);
    }catch(err){
        res.json({message: err});
    }
});

//Request all the favourite packs by a userID
router.get('/:clientID', async (req,res) =>{
    try{
    const favouriteList= await FavouriteList.find({clientID : req.params.clientID});
    res.json(favouriteList);
    }catch(err){
        res.json({message:err});
    }
});

//Save Data to the Database
router.post('/add',  async (req,res) =>{
    
    const favouriteList = new FavouriteList({
        name : req.body.name,
        clientID : req.body.clientID,
        availability : req.body.availability,
        products : req.body.products
    });
try{
    const savedFavouriteList = await favouriteList.save();
    res.json(savedFavouriteList);
}catch(err){
    res.json({message: err});
}
   
});

// Delete a Favourite pack from the database

router.delete('/delete/:packID', async (req,res) =>{
    try{

        const deletedFavouriteList = await FavouriteList.deleteOne({_id : req.params.packID});
        res.json(deletedFavouriteList);

    }catch(err){
        res.json({message: err});
    }
});

//Edit a pack information

router.patch('/edit/:packID', async (req,res) =>{

    try{

        const editedPack = await FavouriteList.update({_id : req.params.packID}, {$res : {
            name : req.body.name,
        clientID : req.body.clientID,
        availability : req.body.availability,
        products : req.body.products
        }});

        res.json(editedPack);

    }catch(err){
        res.json({message: err});
    }

});

module.exports=router;