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
app.get("/getStatus/:id", async (req, res) => {
  while ((await checkProgress(req.params.id)) == false);
  res.send(
    `\n\nstatus of job ${req.params.id} : ${jobs[`job:${req.params.id}`]}%\n\n`
  );
});
const checkProgress = async (jobId) => {
  return new Promise((resolve, reject) => {
    if (jobs[`job:${jobId}`] < 100)
      setTimeout(() => {
        resolve(false);
      }, 1000);
    else resolve(true);
  });
};
app.listen(8080, () => {
  console.log("listening on 8080");
});
