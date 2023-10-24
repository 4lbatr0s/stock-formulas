import { Schema, model } from "mongoose";

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Role = model("Role", RoleSchema);

export default Role;
