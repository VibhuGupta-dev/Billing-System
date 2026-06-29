import type { Request, Response } from "express";
import ShopModel from "../../models/shopModel/shopmodel.js";
import mongoose from "mongoose"

export async function createShop(req: Request, res: Response) {
  const userId =req.userId?.toString()
  
  if (typeof userId!=="string" || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Invalid User" });
  }
  try {
    const {
      ShopName,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,
    } = req.body;
    console.log(ShopName,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,)

    if(typeof ShopName!=="string"|| !ShopName.trim()){
      return res.status(400).json({message:"Invalid ShopName type"})
    }

    if(typeof Industry!=="string"|| !Industry.trim()){
      return res.status(400).json({message:"Invalid Industry type"})
    }


    const ShopPhoto = req.file ? `/uploads/${req.file.filename}` : null;
 console.log(ShopPhoto)
    
    await ShopModel.create({
      UserId: userId, // 🔥 LOGGED IN USER ID
      ShopName,
      ShopPhoto,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,
    });

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
}

export async function updateShop (req:Request,res:Response) {
try { 

 const shopId = req.params.shopId

 if (typeof shopId!=="string" || !mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(401).json({ message: "Invalid shop" });
  }

 const {
      ShopName,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,
    } = req.body;

    if(typeof ShopName!=="string"|| !ShopName.trim()){
      return res.status(400).json({message:"Invalid ShopName type"})
    }

    if(typeof Industry!=="string"|| !Industry.trim()){
      return res.status(400).json({message:"Invalid Industry type"})
    }

    if(isNaN(Number(NumberOfWorkers))||NumberOfWorkers<0||typeof NumberOfWorkers!=="number"){
      return res.status(400).json({message:"Invalid No of Workers"})
    }

    if(isNaN(Number(ElectricityPerUnitRate))||ElectricityPerUnitRate<0||typeof ElectricityPerUnitRate!=="number"){
      return res.status(400).json({message:"Invalid Electricity Per Unit Rate"})
    }

    if(typeof ShopIsOnRent !== "boolean"){
      return res.status(400).json({message:"Invalid Type for Shop is On Rent"})
    }

    if(isNaN(Number(ShopRent))||ShopRent<0||typeof ShopRent !=="number"){
      return res.status(400).json({message:"Invalid Shop Rent Type"})
    }
    
    const userId=req.userId?.toString()
    
     if (typeof userId!=="string" || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Invalid User" });
    }
    
    const ShopPhoto = req.file ? `/uploads/${req.file.filename}` : null;

    if (ShopPhoto && typeof ShopPhoto !== "string") {
           return res.status(400).json({ message: "Invalid Shop photo type" })
    }
     
    const shopinfo  = await ShopModel.findOneAndUpdate({UserId:userId,_id:shopId},{
      ShopName,
      ShopPhoto,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,
    })

    if(!shopinfo){
         return res.status(404).send({message:"Shop not found"})
    }
    else {
         return res.status(200).send({message:"Done updating..."})
    }
  }
  catch(err){
  return res.status(400).json({
      success: false,
      message: err || "Something went wrong",
    });
}
}

export async function delShop(req:Request,res:Response){
    try{
      const userId=req.userId?.toString()
      if (typeof userId!=="string" || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Invalid user" });
  }

      const shopId= req.params.shopId
      if (typeof shopId!=="string" || !mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(401).json({ message: "Invalid shop" });
  }
      
      await ShopModel.findOneAndDelete({UserId:userId,_id:shopId})
      
      return  res.status(201).json({message:"shop deleted successfully"})
    }   
     catch(err){
      return res.status(500).json({message:"There is an error"})
    }

}
 
export async function renderShop(req: Request, res: Response) {
  try {
        console.log("clicked")

    const userId = req.userId?.toString();
    if(typeof userId !=="string"||!mongoose.Types.ObjectId.isValid(userId))
    {
      return res.status(400).json({message:"Invalid user"})
    }

    const store = await ShopModel.find({UserId: userId});

    if (!store) {
      return res.status(404).json({ message: "Shop Not Found" });
    }

    return res.send(store);

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
}
