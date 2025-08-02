import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  checkListItems: defineTable({
    title: v.string(),
    isCompleted: v.boolean(),
    userId: v.id("users"),
  }).index("by_userId", ["userId"]),
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.string(),
  }).index("by_clerkId", ["clerkId"]),
});
