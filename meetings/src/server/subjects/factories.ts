import { Factory, association } from "miragejs";
import faker from "faker";

export const SubjectFactory = Factory.extend({
  title: () => `${faker.hacker.phrase()}`,
  meeting: association()
});
