import { Model, hasMany } from "miragejs";

export const Meeting = Model.extend({
  subjects: hasMany()
});
