import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["query", "info", "warn", "error"],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    // Used for testing purposes to clean up the database between tests
    if (process.env.NODE_ENV === "test") {
      // Add tables to clear in the correct order to avoid foreign key constraints
      const tables = ["User"]; // Add more tables as needed

      for (const table of tables) {
        await this.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
      }
    }
  }
}
