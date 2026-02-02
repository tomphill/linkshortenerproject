"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createLink as createLinkHelper,
  updateLink as updateLinkHelper,
  deleteLink as deleteLinkHelper,
} from "@/data/links";
import { revalidatePath } from "next/cache";

const createLinkSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL")
    .max(2048, "URL must be at most 2048 characters"),
  customSlug: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]*$/,
      "Only letters, numbers, hyphens, and underscores allowed",
    )
    .min(3, "Custom slug must be at least 3 characters")
    .max(20, "Custom slug must be at most 20 characters")
    .optional()
    .or(z.literal("")),
});

export interface CreateLinkInput {
  url: string;
  customSlug?: string;
}

export interface CreateLinkResult {
  success?: boolean;
  error?: string;
  shortCode?: string;
}

/**
 * Server action to create a new shortened link
 */
export async function createLink(
  input: CreateLinkInput,
): Promise<CreateLinkResult> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // Validate input
    const validated = createLinkSchema.parse(input);

    // Convert empty string to undefined
    const customSlug =
      validated.customSlug === "" ? undefined : validated.customSlug;

    // Create link via helper function
    const link = await createLinkHelper(userId, validated.url, customSlug);

    // Revalidate the dashboard page to show the new link
    revalidatePath("/dashboard");

    return { success: true, shortCode: link.shortCode };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }

    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes("unique")) {
      return { error: "This custom slug is already taken" };
    }

    // Only log detailed errors in development to prevent sensitive data exposure
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating link:", error);
    }
    return { error: "Failed to create link. Please try again." };
  }
}

const updateLinkSchema = z.object({
  linkId: z.number(),
  url: z
    .string()
    .url("Please enter a valid URL")
    .max(2048, "URL must be at most 2048 characters"),
  customSlug: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]*$/,
      "Only letters, numbers, hyphens, and underscores allowed",
    )
    .min(3, "Custom slug must be at least 3 characters")
    .max(20, "Custom slug must be at most 20 characters")
    .optional()
    .or(z.literal("")),
});

export interface UpdateLinkInput {
  linkId: number;
  url: string;
  customSlug?: string;
}

export interface UpdateLinkResult {
  success?: boolean;
  error?: string;
}

/**
 * Server action to update an existing link
 */
export async function updateLink(
  input: UpdateLinkInput,
): Promise<UpdateLinkResult> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // Validate input
    const validated = updateLinkSchema.parse(input);

    // Convert empty string to undefined
    const customSlug =
      validated.customSlug === "" ? undefined : validated.customSlug;

    // Update link via helper function
    const updatedLink = await updateLinkHelper(
      validated.linkId,
      userId,
      validated.url,
      customSlug,
    );

    if (!updatedLink) {
      return { error: "Link not found or unauthorized" };
    }

    // Revalidate the dashboard page to show the updated link
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }

    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes("unique")) {
      return { error: "This custom slug is already taken" };
    }

    // Only log detailed errors in development to prevent sensitive data exposure
    if (process.env.NODE_ENV === "development") {
      console.error("Error updating link:", error);
    }
    return { error: "Failed to update link. Please try again." };
  }
}

const deleteLinkSchema = z.object({
  linkId: z.number(),
});

export interface DeleteLinkInput {
  linkId: number;
}

export interface DeleteLinkResult {
  success?: boolean;
  error?: string;
}

/**
 * Server action to delete a link
 */
export async function deleteLink(
  input: DeleteLinkInput,
): Promise<DeleteLinkResult> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // Validate input
    const validated = deleteLinkSchema.parse(input);

    // Delete link via helper function
    const deleted = await deleteLinkHelper(validated.linkId, userId);

    if (!deleted) {
      return { error: "Link not found or unauthorized" };
    }

    // Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }

    // Only log detailed errors in development to prevent sensitive data exposure
    if (process.env.NODE_ENV === "development") {
      console.error("Error deleting link:", error);
    }
    return { error: "Failed to delete link. Please try again." };
  }
}
