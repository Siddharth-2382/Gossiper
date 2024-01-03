import { Server } from "socket.io";
import Redis from "ioredis";
import { produceMessage } from "./kafka";

// Initialize publisher and subscriber
const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};

// Initialize publisher and subscriber
const publisher = new Redis(redisConfig);
const subscriber = new Redis(redisConfig);

// Socket Service class implementation
class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: { allowedHeaders: ["*"], origin: "*" },
    });

    subscriber.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    io.on("connect", (socket) => {
      socket.on("event:message", async ({ message }: { message: string }) => {
        // publish the received message
        await publisher.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    // emit the message to the subscribers
    subscriber.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
        await produceMessage(message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
