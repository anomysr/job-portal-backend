const Application =
require("../models/application");

const applyJob = async (req, res) => {
    try {

        const application =
        await Application.create({
            job: req.params.jobId,
            applicant: req.user._id
        });

        res.status(201).json(
            application
        );

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    applyJob
};