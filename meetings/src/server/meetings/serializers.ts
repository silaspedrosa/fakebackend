export function meetingSerializer(ApplicationSerializer) {
  return ApplicationSerializer.extend({
    include: ["subjects"]
  });
}
