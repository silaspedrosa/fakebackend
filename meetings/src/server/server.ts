import {
  Server,
  RestSerializer,
  Model,
  Factory,
  Response,
  hasMany,
  belongsTo,
  trait,
  association
} from "miragejs";
import { environment } from "../environments/environment";
import faker from "faker";
import { isAfter, subYears, differenceInYears } from "date-fns";
import { meetingSerializer } from "./meetings/serializers";
import { MeetingFactory } from "./meetings/factories";
import { meetingsRoutes } from "./meetings/routes";
import { Meeting } from "./meetings/models";

const ApplicationSerializer = RestSerializer.extend({
  embed: true
});

export function makeServer() {
  return new Server({
    serializers: {
      application: ApplicationSerializer,
      meeting: meetingSerializer(ApplicationSerializer),
      subject: ApplicationSerializer.extend({
        include: ["meeting"]
      })
    },
    models: {
      meeting: Meeting,
      subject: Model.extend({
        meeting: belongsTo()
      })
    },
    factories: {
      meeting: MeetingFactory,
      subject: Factory.extend({
        title: () => `${faker.hacker.phrase()}`,
        meeting: association()
      })
    },
    routes() {
      this.urlPrefix = environment.apiUrl;
      this.namespace = "api";
      this.passthrough();
      this.timing = 1000;

      // this.resource("subjects");
      meetingsRoutes(this);
    },
    seeds: server => {
      server.createList("meeting", 10, "withSubjects");
      server.createList("meeting", 10, "withSubjects");
      // server.createList("meeting", 10);
    }
  });
}
