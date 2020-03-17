import faker from "faker";
import { association, Factory, RestSerializer, Server } from "miragejs";
import { environment } from "../environments/environment";
import { MeetingFactory } from "./meetings/factories";
import { Meeting } from "./meetings/models";
import { meetingsRoutes } from "./meetings/routes";
import { meetingSerializer } from "./meetings/serializers";
import { Subject } from "./subjects/models";
import { subjectSerializer } from "./subjects/serializers";
import { SubjectFactory } from "./subjects/factories";
import { meetingsSeeds } from "./meetings/seeds";

const ApplicationSerializer = RestSerializer.extend({
  embed: true
});

export function makeServer(environmentName: "development" | "test") {
  return new Server({
    environment: environmentName,
    serializers: {
      application: ApplicationSerializer,
      meeting: meetingSerializer(ApplicationSerializer),
      subject: subjectSerializer(ApplicationSerializer)
    },
    models: {
      meeting: Meeting,
      subject: Subject
    },
    factories: {
      meeting: MeetingFactory,
      subject: SubjectFactory
    },
    routes() {
      this.urlPrefix = environment.apiUrl;
      this.namespace = "api";
      this.passthrough();
      this.timing = 1000;

      meetingsRoutes(this);
    },
    seeds: server => {
      meetingsSeeds(server);
      console.log(server.db.dump());
    }
  });
}
