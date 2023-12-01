const express = require("express");
const app = express();
const jobs = {};
const updateJob = (jobId) => {
  if (jobs[jobId] == 100) return;
  jobs[jobId] += 10;
  console.log(jobs[jobId]);
  setTimeout(() => {
    updateJob(jobId);
  }, 3000);
};
app.post("/submit", (req, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId);
  res.send(`\n${jobId}\n`);
});
app.get("/getStatus/:id", (req, res) => {
  const progress = jobs[`job:${req.params.id}`];
  res.send(`\n\nstatus of job ${req.params.id} : ${progress}%\n\n`);
});
app.listen(8080, () => {
  console.log("listening on 8080");
});
