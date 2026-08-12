import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    full_name: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "fullname is required "
            : "full_name must be string",
      })
      .min(3, "full_name must be 3 character long")
      .max(100, "fullname must not exced 100 character"),
    password: z.string({
      error: (issue) =>
       issue.input === null
          ? "password is required "
          : "password must be string",
    }),
    email: z.email({
      error:(issue)=>issue.input=== undefined ?"email is required ":"Invalid email",
  }),
}),
params:z.object({}).default({}),
query:z.object({}).default({}),
});

export const loginSchema = z.object({
  body:z.object({
    email:z.email({
      error:(issue)=>issue.input === undefined ?"Email is required":"Invalid credintals"
    }),
    password:z.string({
      error:(issue)=> issue.input === null ?"password is required":"Invalid credintals",

    })
  })
});


