declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Kafka
      KAFKA_BROKER_URL: string;
      KAFKA_USERNAME: string;
      KAFKA_PASSWORD: string;

      // Redis
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {};
