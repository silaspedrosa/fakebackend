import { Factory, trait } from "miragejs";
import faker from "faker";

export const MeetingFactory = Factory.extend({
  status: i => ["Open", "Closed"][i % 2],
  date: () => faker.date.past(), //.toLocaleDateString(),
  description: () => faker.lorem.words(3),
  withSubjects: trait({
    afterCreate(meeting, server) {
      const count = Math.floor(Math.random() * 10);
      server.createList("subject", count, { meeting });
    }
  })
});
