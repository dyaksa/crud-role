const eventModel = require("../model/eventModel");
const _ = require("lodash"); 
const { responseData } = require('../utils/responseData');
const { formData } = require("../utils/formData");

module.exports = {
    getEvents: async (req,res) => {
        try {
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'success'
            });
        }catch(err){
            return res.status(200).send({
                status: 200,
                message: 'success'
            })
        }
    },

    getEventById: async (req,res) => {
        try {
            const { id } = req.params;
            const event = await eventModel.findById(id);
            if(!_.isEmpty(event)){  
                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'success',
                    error: null,
                    data: {
                        id: event[0].id,
                        title: event[0].title,
                        description: event[0].description,
                        created: {
                            email: event[0].usermail
                        }
                    }
                })
            }
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'not found',
                error: null,
                created: {}
            })
        }catch(err){
            return res.status(500).send({
                status: 500,
                success: false,
                message: 'error',
                error: err.message
            })
        }
    },

    createEvents: async (req,res) => {
        try {
            const data = { ...req.body, userId: req.userId };
            const saved = await eventModel.save(data);
            if(saved.affectedRows){
                return res.status(201).send({
                    status: 201,
                    success: true,
                    message: 'success',
                    error: null,
                    data: saved 
                })
            }
            return res.status(200).send({
                status: 200,
                success: false,
                message: 'error',
                error: 'cannot saved',
                data: []
            })
        }catch(err){
            return res.status(500).send({
                status: 500,
                success: false,
                message: 'error',
                errors: err.message
            })
        }
    },

    updatedEvent: async (req,res) => {
        try {
            const { id } = req.params;
            const body = formData(req.body);
            const founded = await eventModel.findById(id);
            if(_.isEmpty(founded)){
                return res.status(404).send({
                    status: 404,
                    success: false,
                    message: 'error',
                    error: 'event not found'
                })
            }
            await eventModel.updateById(id, body);
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'success',
                data: {
                    id: founded[0].id,
                    title: req.body.title,
                    description: req.body.description
                }
            })
        }catch(err){
            return res.status(500).send({
                status: 500,
                success: false,
                message: 'error',
                error: err.message
            })
        }
    },

    deleteEvent: async (req,res) => {
        try {
            const { id } = req.params;
            const found = await eventModel.findById(id);
            const data = responseData(found[0]);
            if(!_.isEmpty(found)){
                await eventModel.deleteById(id);
                return res.status(202).send({
                    status: 202,
                    success: true,
                    message: 'success',
                    data: data
                })
            }
            return res.status(404).send({
                status: 404,
                success: false,
                message: 'error',
                error: 'event not found'
            })
        }catch(err){
            return res.status(500).send({
                status: 500,
                success: false,
                message: 'error',
                error: err.message
            })
        }
    }
}