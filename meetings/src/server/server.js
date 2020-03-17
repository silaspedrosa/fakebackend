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

const ApplicationSerializer = RestSerializer.extend({
  embed: true
});

export function makeServer() {
  return new Server({
    serializers: {
      application: ApplicationSerializer,
      meeting: ApplicationSerializer.extend({
        include: ["subjects"]
      }),
      subject: ApplicationSerializer.extend({
        include: ["meeting"]
      })
    },
    models: {
      meeting: Model.extend({
        subjects: hasMany()
      }),
      subject: Model.extend({
        meeting: belongsTo()
      })
    },
    factories: {
      meeting: Factory.extend({
        status: i => ["Open", "Closed"][i % 2],
        date: () => faker.date.past(), //.toLocaleDateString(),
        description: () => faker.lorem.words(3),
        withSubjects: trait({
          afterCreate(meeting, server) {
            const count = Math.floor(Math.random() * 10);
            server.createList("subject", count, { meeting });
          }
        })
      }),
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

      this.resource("meetings");
      this.resource("subjects");
      this.get("/meetings", (schema, request) => {
        const page = parseInt(request.queryParams.page) || 1;
        const pageSize = parseInt(request.queryParams.pageSize) || 10;
        const search = request.queryParams.search;
        const status = request.queryParams.status;

        return schema.meetings
          .all()
          .filter(fullTextSearch(search))
          .filter(filterByStatus(status))
          .sort((a, b) => (isAfter(a.date, b.date) ? -1 : 1))
          .slice(...paginate(page, pageSize));
      });

      this.post("/meetings", function(schema, request) {
        try {
          const attrs = JSON.parse(request.requestBody).meeting;
          const date = new Date(attrs.year, attrs.month - 1, attrs.day);

          if (attrs.description == null || attrs.description.length === 0) {
            return new Response(
              406,
              {},
              { errors: ["Description cannot be blank"] }
            );
          } else if (Math.abs(differenceInYears(date, new Date()) > 100)) {
            return new Response(406, {}, { errors: ["Invalid date"] });
          }

          const subjects = attrs.subjects;
          attrs.subjects = null;
          const meeting = schema.meetings.create({
            ...{
              status: "Open",
              date: new Date(attrs.year, attrs.month - 1, attrs.day),
              description: ""
            },
            ...attrs
          });
          subjects.forEach(s => {
            schema.subjects.create({ ...s, meeting });
          });
          return meeting;
        } catch (error) {
          console.log(error);
        }
      });
    },
    seeds: server => {
      server.createList("meeting", 10, "withSubjects");
      server.createList("meeting", 10, "withSubjects");
      // server.createList("meeting", 10);
    }
  });
}

function fullTextSearch(search) {
  return m => {
    if (search == null || search.length < 3) return true;
    const fullText = (m.date + m.status + m.subjectCount + m.description)
      .replace(/ /g, "")
      .toLowerCase();
    const normalizedSearch = search.replace(/ /g, "").toLowerCase();
    return fullText.indexOf(normalizedSearch) !== -1;
  };
}

function filterByStatus(status) {
  return m => {
    if (status == null || status === "All") return true;
    return m.status === status;
  };
}

function paginate(page, pageSize) {
  return [pageSize * (page - 1), pageSize * page];
}
