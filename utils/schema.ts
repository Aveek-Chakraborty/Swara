import { pgTable, varchar } from "drizzle-orm/pg-core";

export const Blogs = pgTable("blogs",{
  uuid:varchar('uid').primaryKey(),
  content:varchar('content')
});

export const Events = pgTable("events",{
  uuid:varchar('uid').primaryKey(),
  content:varchar('content'),
  link: varchar('link')
});

export const Messages = pgTable("messages",{
  uuid:varchar('uid').primaryKey(),
  name:varchar('name'),
  email:varchar('email'),
  mobile:varchar('mobile'),
  message:varchar('message'),
  time:varchar('time')
});


