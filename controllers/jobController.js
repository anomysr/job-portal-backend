const Job = require("../models/Job");

const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            description
        } = req.body;

        const job = await Job.create({
            title,
            company,
            location,
            description,
            recruiter: req.user._id
        });

        res.status(201).json(job);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("recruiter", "name email");

        res.json(jobs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getJobById = async (req, res) => {
    try {

        const job = await Job.findById(
            req.params.id
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (
            job.recruiter.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const updatedJob =
            await Job.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(updatedJob);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteJob = async (req, res) => {
    try {

        const job = await Job.findById(
            req.params.id
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (
            job.recruiter.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await job.deleteOne();

        res.json({
            message: "Job deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = { createJob , getJobs, getJobById,updateJob,deleteJob};