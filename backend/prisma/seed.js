/**
 * DEVELOPMENT SEED DATA ONLY.
 * Never run against a production database.
 * Creates one demo account: demo@runtrack.app / password123
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@runtrack.app" },
    update: {},
    create: {
      name: "Demo Runner",
      email: "demo@runtrack.app",
      passwordHash,
      weightKg: 70,
    },
  });

  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const started = new Date(now);
    started.setDate(started.getDate() - i * 2);
    started.setHours(7, 0, 0, 0);
    const durationSec = 1500 + i * 120;
    const distanceKm = 5 + i * 0.8;
    const ended = new Date(started.getTime() + durationSec * 1000);

    await prisma.activity.create({
      data: {
        userId: user.id,
        title: `Morning Run #${i + 1}`,
        type: "run",
        distanceKm,
        durationSec,
        avgPaceSec: Math.round(durationSec / distanceKm),
        avgSpeedKmh: Math.round((distanceKm / (durationSec / 3600)) * 10) / 10,
        calories: Math.round(distanceKm * 65),
        elevationGainM: 10 + i,
        startedAt: started,
        endedAt: ended,
        gpsPoints: {
          create: [
            { lat: -6.2, lng: 106.8, timestamp: started, sequence: 0 },
            { lat: -6.201, lng: 106.801, timestamp: new Date(started.getTime() + 60000), sequence: 1 },
            { lat: -6.202, lng: 106.802, timestamp: ended, sequence: 2 },
          ],
        },
      },
    });
  }

  console.log("Seed complete. Login with demo@runtrack.app / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
