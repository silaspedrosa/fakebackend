export function meetingsSeeds(server) {
  server.createList("meeting", 50, "withSubjects");
}
