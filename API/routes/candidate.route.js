const candidateControler = require("../controlers/candidate.controler");
const express = require("express");
const router = express.Router();

router.route("/postcandidate").post(candidateControler.createCandidate);
router.route("/getcandidate").get(candidateControler.findCandidate);
router.route("/putcandidate").put(candidateControler.updateCandidate);
router.route('/deletecandidate').delete(candidateControler.deleteCandidate);
router.route("/deletemanycandidate").delete(candidateControler.deleteManyCandidate);
router.route("/getcandidatebyid").get(candidateControler.getCandidateById);
router.route("/getcandidatebyemail").get(candidateControler.getCandidateByemail);
router.route("/search").get(candidateControler.Search);
router.route('/sortorder').get(candidateControler.sortOrder)



module.exports = router;
