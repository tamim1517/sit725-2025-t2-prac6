const Project = require('../models/projectModel');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: "Success" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

exports.addNumbers = (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        if (isNaN(a) || isNaN(b)) {
            return res.status(400).send("Invalid input");
        }
        const sum = a + b;
        res.send(`The sum of ${a} and ${b} is: ${sum}`);
    } catch (err) {
        res.status(500).send("Server error");
    }
};
