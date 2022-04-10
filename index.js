const { saveImage, createBanner } = require("./imageController");
const client = require("./twitterClient");
const CronJob = require("cron").CronJob;

// executed every minute
const job = new CronJob("* * * * *", async function () {
  generateBanner();
  console.log("banner updated...");
});
job.start();

const {
  getFollowers,
  test,
  getProfileImageUrl,
  updateBanner,
} = require("./twitterController");
// async function testTweet() {
//   await client.v2.tweet("Testing Twitter bot");
// }

// testTweet();

async function generateBanner() {
  const followers = await getFollowers();

  for (const follower of followers) {
    const url = await getProfileImageUrl(follower.id);
    await saveImage(follower.id, url);
  }

  await createBanner();
  await updateBanner();
}

// getFollowers();
// test();
// generateBanner();
// createBanner();
