import Bull from "bull";

const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
};

export const emailQueue = new Bull("emailQueue", { redis: redisConfig });
