import { Response } from "miragejs";
import { isAfter, differenceInYears } from "date-fns";

export function meetingsRoutes(router) {
  router.resource("meetings");
  router.get("/meetings", (schema, request) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/meetings", function(schema, request) {
    try {
      const attrs = JSON.parse(request.requestBody).meeting;
      const date = new Date(attrs.year, attrs.month - 1, attrs.day);

      if (attrs.description == null || attrs.description.length === 0) {
        return new Response(
          406,
          {},
          { errors: ["Description cannot be blank"] }
        );
      } else if (Math.abs(differenceInYears(date, new Date())) > 100) {
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
