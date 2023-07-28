const Interest=require('../models/Interest');

exports.addInterest=async(req,res)=>{
    console.log(Interest);
    try {
        console.log(req);
        console.log(req.body);
        const {interestName}=req.body;
            const interest=new Interest({interestName});
            interest.save();
            res.status(201).json({message:"Interest added"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}