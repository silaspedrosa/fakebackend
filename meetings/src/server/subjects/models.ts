import { Model, belongsTo } from "miragejs";

export const Subject = Model.extend({
  meeting: belongsTo()
});
