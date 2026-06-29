import express from "express";
import isloggedin from "../../middleware/Auth/Auth.js";
import { createShop, updateShop, delShop, renderShop } 
from "../../controllers/ShopController/shopcontroller.js";
import { upload } from "../../config/Multer_config/multer_config.js";

const router = express.Router();

router.post(
  "/addshop",
  isloggedin,
  upload.single("ShopPhoto"),
  createShop
);

router.put(
  "/updateShop/:shopId",
  isloggedin,
  upload.single("ShopPhoto"),
  updateShop
);

router.delete(
  "/deleteshop/:shopId",
  isloggedin,
  delShop
);

router.get(
  "/ShopInfo",
  isloggedin,
  renderShop
);

export default router;
