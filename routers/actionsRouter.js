const express = require("express")
const actionsDb = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req,res,next) =>{
    actionsDb
        .get()
        .then((actions) => {
            return res.status(200).json(actions)
        })
        .catch(error => {
            next(error)
        })
})

router.get("/:id", (req,res,next) =>{
    post_id = req.params.id
    actionsDb
        .get(req.params.id)
        .then((project) => {
            if(!project){
                return res.status(404).json({
                    error: "Could not find action with the specified ID"
                })
            } else {
                return res.status(200).json(project)
            }
        })
        .catch(error => {
            next(error)
        })
})

//post
router.post("/", (req,res,next) => {
    if(!(req.body.notes && req.body.description && req.body.project_id )) {
        return res.status(404).json({
            error: "Action needs notes, description and project ID"
        })
    }
    actionsDb
        .insert(req.body)
        .then((actions)=> {
            return res.status(200).json(actions)
        })
        .catch((error)=> {
            next(error)
        })
})

//put.id
router.put("/:id", (req,res,next) => {
    if(!(req.body.notes && req.body.description && req.body.project_id )) {
        return res.status(404).json({
            error: "Action needs notes, description and project ID"
        })
    }
    actionsDb
        .update(req.params.id, req.body)
        .then((actions)=> {
            if(!actions){
                res.status(404).json({
                    error: "Could not find action with the specified ID"
                })
            }else{
                return res.status(200).json(actions)
            }
        })
        .catch((error)=> {
            next(error)
        })
})
//delete
router.delete("/:id", (req,res,next) =>{
    post_id = req.params.id
    actionsDb
        .remove(req.params.id)
        .then((action) => {
            if(!action){
                return res.status(404).json({
                    error: "Could not find action with the specified ID"
                })
            } else {
                return res.status(200).json(action)
            }
        })
        .catch(error => {
            next(error)
        })
})

// notes required
// description required
//project_id required, of existing proj

module.exports = router;