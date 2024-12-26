const express = require('express');
const router = express.Router();
exports.router = router;
const Person = require('./../models/persons');

router.post('/', async (req, res) => {
    
    try{
      const data = req.body // Assuming the request body contains the Person data

    //Create new Person document using mongoose model
    const newPerson = new Person(data);

    //Save the new person at database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })
router.get('/', async (req, res) =>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
      res.status(500).json({error:'Internal server error'});
  }
})

//Parameterization of data, to filter the database on basis of 'work' parameter
router.get('/:worktype', async(req, res)=>{
    try{
      const worktype = req.params.worktype;
      if(worktype == 'Chef'|| worktype == 'manager' || worktype == 'waiter' || worktype == 'watchman'){
        const response = await Person.find({work: worktype});
        console.log('data fetched');
        res.status(200).json(response);
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })

  router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id //Extract the id from uRL parameter
        const updatedPersonData = req.body // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true //run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('Data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
  })

  router.delete('/:id', async(req, res)=>{
    try{
        const personId = req.params.id //Extract the id from uRL parameter

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('Person deleted successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
  })

  module.exports = router;