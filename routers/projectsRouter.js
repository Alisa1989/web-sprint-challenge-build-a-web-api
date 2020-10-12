const express = require("express");
const projectDb = require("../data/helpers/projectModel")

const router = express.Router();

router.get("/", (req, res, next) => {
    projectDb
    .get()
    .then((projects)=>{
        res.status(200).json(projects)
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/:id", (req, res, next) => {
    projectDb
    .get(req.params.id)
    .then((projects)=>{
        if(!projects) {
            return res.status(404).json({
                error: "project with specified id not found"
            })
        } else {
        return res.status(200).json(projects)
        }
    })
    .catch((error) => {
        next(error)
    })
})

router.post("/", (req, res, next) => {
    if (!req.body.name || !req.body.description){
        return res.status(400).json({
            error: "New project must contain name and description"
        })
    }
    projectDb
    .insert(req.body)
    .then((project) => {
        return res.status(202).json(project)
    })
    .catch((error) => {
        next(error)
    })
})

router.put("/:id", (req,res,next) => {
    if (!req.body.name || !req.body.description){
        return res.status(400).json({
            error: "New project must contain name and description"
        })
    }
    projectDb
    .update(req.params.id, req.body)
    .then((project) => {
        if (!project) {
            return res.status(404).json({
                error: "Could not find a project with the given ID"
            })
        }
        return res.status(202).json(project)
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/:id", (req,res,next) => {
    projectDb
    .remove(req.params.id)
    .then((project) => {
        if (!project){
            return res.status(404).json({
                error: "Could not find a project with the given ID"
            })
        } else {
            return res.status(200).json(project)
        }
    })
    .catch((error) =>{
        next(error)
    })
})

///////////IF TIME ADD MIDDLEWARE

module.exports = router;