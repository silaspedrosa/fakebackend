export function subjectSerializer(ApplicationSerializer) {
  return ApplicationSerializer.extend({
    include: ["meeting"]
  });
}
