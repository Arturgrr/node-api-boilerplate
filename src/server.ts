import { env } from "./env";
import buildApp from "./infra/http/app";

async function startServer() {
  const app = await buildApp();

  app.listen({
      port: env.PORT,
  }).then(() => {
      console.log("🚀 HTTP Server Running!");
  });
}

startServer();