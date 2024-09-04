const asyncHandler = require('express-async-handler');
const Jobs = require('../modals/job');

const createJob = asyncHandler(async (jobs) => {
  let duplicateJobsCount = 0;

  for (const job of jobs) {
    const existingJob = await Jobs.findOne({
      description: job.description,
    });

    if (!existingJob) await Jobs.create(job);
    else duplicateJobsCount += 1;
  }

  return duplicateJobsCount;
});

module.exports = {
  createJob,
};
