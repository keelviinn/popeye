import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as ioServer } from 'socket.io'
import { connect } from 'mongoose';
import { GeoLocation } from './models';
import { seedDatabase } from './db/seedDatabase';

const PORT = process.env.PORT || 3333;
const corsOptions = { origin:'*' };

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = new ioServer(server, { cors: { ...corsOptions, credentials: false } });

let interval = 5;

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("get-geolocation", ({ routeLabel }) => {
    GeoLocation.findOne({ label: routeLabel }).then(({type, features}: any) => {
      if (type && features) {
        socket.emit("set-geolocation", { type, features });
        socket.emit("set-position", features[0].geometry.coordinates[0]);
        interval = 0;
      }
    });
  })

  socket.on("set-time", ({ time }) => { interval = time });

  socket.on("start-navigation", async ({ time, routeLabel }) => {
    const { type, features }: any = await GeoLocation.findOne({ label: routeLabel });

    if (type && features) {
      const coordinates = features[0].geometry.coordinates;
      const coordinatesLength = coordinates.length;

      if (coordinatesLength === 0) return;
      interval = time;

      for (let i = 0; i <= coordinatesLength - 1; i++) {
        if (!socket.connected) return;

        await new Promise<void>((resolve) => {
          setTimeout(() => {
            console.log(`Sending coordinates: ${coordinates[i]}`);
            socket.emit("set-position", coordinates[i]);
            resolve();
          }, interval * 1000);
        });
      }
    }
  })

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(interval);
  });
});

server.listen(PORT, async () => {
  console.log(`Listening on: http://localhost:${PORT}`);
  try {
    await connect('mongodb://localhost:27017/popeye', {});
    await seedDatabase();
    console.log("Connected to the database");
  } catch (error) {
    console.error(error)
  }
});