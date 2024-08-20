const express = require('express');
const progressRouter = express.Router();
import progressController from require("../controllers/progress.controller");

progressRouter
    .post('/progress', progressController.saveProgress);

progressRouter
    .get('/progress/:studentId/:examId', progressController.getProgress);

export default progressRouter;
