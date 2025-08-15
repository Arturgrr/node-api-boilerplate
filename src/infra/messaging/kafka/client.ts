import { env } from "@/env";
import { ConsoleLoggerProvider } from "@/infra/providers/ConsoleLoggerProvider";
import { Kafka } from "kafkajs";
import { KafkaJSLogCreator } from "./logger";

const logger = new ConsoleLoggerProvider();

const logCreator = KafkaJSLogCreator(logger);


export const kafka = new Kafka(
    {
        clientId: env.KAFKA_CLIENT_ID,
        brokers: [env.KAFKA_BROKER],
        logCreator,
    }
)