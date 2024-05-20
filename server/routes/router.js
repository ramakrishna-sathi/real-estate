const express = require("express");
const router = express.Router();
const sellers = require("../models/seller");

router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {place, Area, Bedrooms, Bathrooms,  NearbyFacilities} = req.body;
    if(!place || !Area ||!Bedrooms ||!Bathrooms || !NearbyFacilities){
        res.status(422).json("plz fill the data");
    }
    try {
        const adduser = new sellers({
            place, Area, Bedrooms, Bathrooms,  NearbyFacilities
        });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
   catch (error) {
        res.status(422).json(error);
   }
})


// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await sellers.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await sellers.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await sellers.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await sellers.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;