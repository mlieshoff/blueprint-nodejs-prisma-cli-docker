import { prisma } from "../index.js";
import { UserDomain } from "../domain/domain.js";
import { createEntityHistory } from "./history/history.js";
import { userHistoryAdapter } from "./history/user.js";

export class UserDao {
  public async save(user: UserDomain): Promise<void> {
    try {
      let dbUser = await prisma.user.findFirst({
        where: {
          firstname: user.firstName,
          lastname: user.lastName,
        },
      });
      if (dbUser) {
        dbUser = await prisma.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            firstname: user.firstName,
            lastname: user.lastName,
            job: user.job,
          },
        });
      } else {
        dbUser = await prisma.user.create({
          data: {
            firstname: user.firstName,
            lastname: user.lastName,
            job: user.job,
          },
        });
      }
      await createEntityHistory(userHistoryAdapter, dbUser.id, "system");
      console.log(dbUser);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}
