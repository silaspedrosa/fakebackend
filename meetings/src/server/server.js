import { Server, RestSerializer, Model, Factory, Response } from "miragejs";
import { environment } from "../environments/environment";
import faker from "faker";
import { isAfter } from "date-fns";

export function makeServer() {
  return new Server({
    serializers: RestSerializer,
    models: {
      meeting: Model
    },
    factories: {
      meeting: Factory.extend({
        status: i => ["Open", "Closed"][i % 2],
        date: () => faker.date.past(), //.toLocaleDateString(),
        subjectCount: i => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0][i % 10],
        description: () => faker.lorem.words(3)
      })
    },
    routes() {
      this.urlPrefix = environment.apiUrl;
      this.namespace = "api";
      this.passthrough();
      this.timing = 1000;

      // this.resource("meetings");
      this.get("/meetings", (schema, request) => {
        const page = parseInt(request.queryParams.page) || 1;
        const pageSize = parseInt(request.queryParams.pageSize) || 10;
        const search = request.queryParams.search;
        const status = request.queryParams.status;

        console.log(schema.meetings.all());

        return schema.meetings
          .all()
          .filter(fullTextSearch(search))
          .filter(filterByStatus(status))
          .sort((a, b) => (isAfter(a.date, b.date) ? -1 : 1))
          .slice(...paginate(page, pageSize));
        // .filter(m => {
        //   if (request.)
        //   m.indexOf(re)
        // })
      });

      this.post("/meetings", function(schema, request) {
        let attrs = JSON.parse(request.requestBody).meeting;
        console.log(attrs);
        if (attrs.description == null || attrs.description.length === 0) {
          return new Response(
            406,
            {},
            { errors: ["Description cannot be blank"] }
          );
        }
        return schema.meetings.create({
          ...{
            status: "Open",
            date: new Date(attrs.year, attrs.month - 1, attrs.day),
            subjectCount: 0,
            description: ""
          },
          ...attrs
        });
        // } else {
        //   console.log("caiu no else");
        //   return new Response(
        //     400,
        //     { some: "header" },
        //     { errors: ["name cannot be blank"] }
        //   );
        // }
      });
    },
    seeds: server => {
      server.createList("meeting", 20);
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
    console.log(fullText);
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
