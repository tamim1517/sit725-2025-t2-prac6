const Project = require('../models/projectModel');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: "Success" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};
