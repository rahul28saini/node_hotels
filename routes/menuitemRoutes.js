const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');
const Person = require('./../models/persons');

  //POST route to add a person data
  
  router.post('/', async(req, res) =>{
    try{
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log('data saved');
      res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal servver error'});
    }
  })
  router.get('/', async (req, res) =>{
    try{
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal servver error'});
    }
  })
//Parameterization of data, to filter the database on basis of 'taste' parameter
  router.get('/:tastetype', async(req, res)=>{
    try{
        const tastetype = req.params.tastetype;
        if(tastetype == 'spicy' || tastetype == 'sweet' || tastetype == 'sour'){
        const response = await MenuItem.find({taste: tastetype});
        console.log('Data fetched');
        res.status(200).json(response);
        }
        
    }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal servver error'});
    }
  })

  router.put('/:id', async(req, res)=>{
    try{
        const menuId = req.params.id //Extract the id from uRL parameter
        const updatedMenuData = req.body // Updated data for the menu

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData,{
            new: true,
            runValidator: true
        })
        if(!response){
            return res.status(404).json({error:'Item not found'});
        }
            console.log('Data updated successfully')
            res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
        
      }
  })

router.delete('/:id', async(req, res)=>{
    try{
        const menuId = req.params.id //Extract the id from uRL parameter

        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:'Item not found'});
        }
        console.log('Item deleted successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
  })
  
  module.exports = router;