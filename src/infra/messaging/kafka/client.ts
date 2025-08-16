import { env } from "@/env";
import { PinoLoggerProvider } from "@/infra/providers/PinoLoggerProvider";
import { Kafka } from "kafkajs";
import { KafkaJSLogCreator } from "./logger";

const logger = new PinoLoggerProvider();

const logCreator = KafkaJSLogCreator(logger);


export const kafka = new Kafka(
    {
        clientId: env.KAFKA_CLIENT_ID,
        brokers: [env.KAFKA_BROKER],
        logCreator,
    }
)