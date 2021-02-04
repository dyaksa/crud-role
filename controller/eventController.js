const eventModel = require("../model/eventModel");
const _ = require("lodash"); 

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

    },

    deleteEvent: async (req,res) => {
        
    }
}