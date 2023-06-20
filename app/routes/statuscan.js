import express from "express";

import {getStatusIdByName,postStatusOnce,getStatus,updateCanStatus,updateCanStatusToAccepted,getStatusofCan} from '../controllers/statuscan.js'

const router = express.Router();


router
    .route("/add")
    .post( postStatusOnce);

router
.route("/cans-by-status/:statusId")
.get(getStatus)
    
router
.route("/:canId/:statusId")
.post(updateCanStatus)


router
    .route("/:canId")
    .post( updateCanStatusToAccepted);

    router
    .route("/:name")
    .get( getStatusIdByName);

    router
    .route("/:idCan/can")
    .get( getStatusofCan);


export default router;