import express from "express";
import {
    RandomProduct,
    FundCollected,
    GetAllRefuges,
    Partenaires,
    GetAllProducts,
    GetRefuge
} from "../controllers/FoodController.js";

import {
    DonateurRegister,
    DonateurLogin,
    GetDonateur,
    UpdateDonateur,
    DeleteDonateur
} from "../controllers/UserController.js";
import { NewOrder, GetOrder } from "../controllers/OrderController.js";

const router = express.Router();

// FoodController
router.get("/randomProduct", RandomProduct);
router.get("/fund", FundCollected);
router.get("/refuge/:id", GetRefuge);
router.get("/refuges", GetAllRefuges);
router.get("/products", GetAllProducts);
router.get("/parrain", Partenaires);


//UserController
router.post("/createAccount", DonateurRegister);
router.post("/connexion", DonateurLogin);       // Connexion
//UserProfile
router.get("/getDonateur/:id", GetDonateur);
router.post("/updateDonateur", UpdateDonateur);
router.post("/deleteDonateur", DeleteDonateur);

//OrderController
router.post("/addOrder", NewOrder);
// affiche toutes les commandes
router.get("/getOrders/:id", GetOrder);
export default router;