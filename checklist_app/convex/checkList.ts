import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const createCheckList = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    return ctx.db.insert("checkListItems", {
      title: args.title,
      isCompleted: false,
      userId: user._id,
    });
  },
});

export const getCheckListItems = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    return ctx.db
      .query("checkListItems")
      .withIndex("by_userId", (q) => q.eq("userId", user._id));
  },
});

export const toggleCheckListItem = mutation({
  args: {
    id: v.id("checkListItems"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const checkListItem = await ctx.db.get(args.id);
    if (!checkListItem) {
      throw new Error("Check list item not found");
    }
    if (checkListItem.userId !== user._id) {
      throw new Error("You are not authorized to toggle this check list item");
    }
    return ctx.db.patch(args.id, {
      isCompleted: !checkListItem.isCompleted,
    });
  },
});

export const deleteCheckListItem = mutation({
  args: {
    id: v.id("checkListItems"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const checkListItem = await ctx.db.get(args.id);
    if (!checkListItem) {
      throw new Error("Check list item not found");
    }
    if (checkListItem.userId !== user._id) {
      throw new Error("You are not authorized to delete this check list item");
    }
    return ctx.db.delete(args.id);
  },
});

export const updateCheckListItemTitle = mutation({
  args: {
    id: v.id("checkListItems"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const checkListItem = await ctx.db.get(args.id);
    if (!checkListItem) {
      throw new Error("Check list item not found");
    }
    if (checkListItem.userId !== user._id) {
      throw new Error("You are not authorized to update this check list item");
    }
    return ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});
