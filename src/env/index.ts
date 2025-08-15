import "dotenv/config";
import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.url(),
    S3_ENDPOINT: z.url(),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_KEY: z.string(),
    S3_BUCKET_NAME: z.string(),
    S3_REGION: z.string().default("us-east-1"),
    KAFKA_BROKER: z.string().default("localhost:9092"),
    KAFKA_CLIENT_ID: z.string().default("node-api"),
    SUPERTOKENS_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Invalid environment variables", _env.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = _env.data;