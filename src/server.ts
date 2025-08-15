import { env } from "./env";
import buildApp from "./infra/http/app";
import { startKafkaConsumers } from "./infra/messaging/kafka/consumers";

async function main() {
  try {
    console.log('🔥 Initializing application...');

    await Promise.all([
      startServer(),
      startWorker(),
    ]);

  } catch (error) {
    console.error('❌ Fatal error during application startup:', error);
    process.exit(1);
  }
}

async function startWorker() {
  console.log('🎧 Kafka worker is listening for messages.');
  const consumers = await startKafkaConsumers();

  const errorTypes = ['unhandledRejection', 'uncaughtException'];
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  errorTypes.forEach(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`);
        console.error(e);
        await Promise.all(consumers.map(c => c.disconnect()));
        process.exit(1);
      } catch (_) {
        process.exit(2);
      }
    });
  });

  signalTraps.forEach(type => {
    process.once(type, async () => {
      try {
        await Promise.all(consumers.map(c => c.disconnect()));
      } finally {
        process.kill(process.pid, type);
      }
    });
  });
}

async function startServer() {
  const app = await buildApp();
  
  app.listen({
    port: env.PORT,
  }).then(() => {
    console.log("🚀 HTTP Server Running!");
  });
}

main();