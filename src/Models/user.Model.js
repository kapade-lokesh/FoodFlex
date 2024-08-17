import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "username is reqired"],
      lowercase: true,
      minlength: [5, "username must be at least 5 letters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email must required"],
      unique: [true, "email must be unique"],
      trim: true,
    },

    mobile: {
      type: String,
      required: [true, "mobile must be required"],
      maxlength: [10, "Phone number should be of length 10"],
      minlength: [10, "Phone number should be of length 10"],
      unique: [true, "mobile must be unique"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "password should be provided"],
      minlength: [6, "password should be at least 6 letters long"],
      unique: true,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
});

userSchema.methods.isPassCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);
