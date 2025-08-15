import { env } from "./env";
import app from "./infra/http/app";

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("🚀 HTTP Server Running!");
});
