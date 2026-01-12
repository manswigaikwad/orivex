import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-0134e8c8/health", (c) => {
  return c.json({ status: "ok" });
});

const getAdminKey = (c: any) => {
  return c.req.header("X-Admin-Key") ?? c.req.query("adminKey");
};

// Submit project inquiry form
app.post("/make-server-0134e8c8/submit-inquiry", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, projectType, technology, deadline, budgetRange, additionalRequirements } = body;

    if (!name || !email || !phone || !projectType) {
      console.log("Form submission validation error: missing required fields");
      return c.json({ error: "Missing required fields" }, 400);
    }

    const timestamp = new Date().toISOString();
    const inquiryId = `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const inquiryData = {
      id: inquiryId,
      name,
      email,
      phone,
      projectType,
      technology: technology || "",
      deadline: deadline || "",
      budgetRange: budgetRange || "",
      additionalRequirements: additionalRequirements || "",
      timestamp,
      status: "new"
    };

    await kv.set(inquiryId, inquiryData);
    console.log(`Form submission successful: ${inquiryId}`);

    return c.json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiryId
    });
  } catch (error) {
    console.log(`Form submission error: ${error}`);
    return c.json({ error: "Failed to submit inquiry" }, 500);
  }
});

// Get all inquiries (admin only)
app.get("/make-server-0134e8c8/inquiries", async (c) => {
  try {
    const adminKey = getAdminKey(c);

    if (adminKey !== "orivex_admin_2026") {
      console.log("Unauthorized admin access attempt");
      return c.json({ error: "Unauthorized" }, 401);
    }

    const inquiries = await kv.getByPrefix("inquiry_");

    // Sort by timestamp (newest first)
    const sortedInquiries = inquiries.sort((a: any, b: any) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    console.log(`Retrieved ${inquiries.length} inquiries for admin`);
    return c.json({ success: true, inquiries: sortedInquiries });
  } catch (error) {
    console.log(`Error retrieving inquiries: ${error}`);
    return c.json({ error: "Failed to retrieve inquiries" }, 500);
  }
});

// Update inquiry status (admin only)
app.post("/make-server-0134e8c8/update-inquiry-status", async (c) => {
  try {
    const adminKey = getAdminKey(c);

    if (adminKey !== "orivex_admin_2026") {
      console.log("Unauthorized admin access attempt");
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { inquiryId, status } = await c.req.json();

    if (!inquiryId || !status) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const inquiry = await kv.get(inquiryId);

    if (!inquiry) {
      return c.json({ error: "Inquiry not found" }, 404);
    }

    const updatedInquiry = { ...inquiry, status };
    await kv.set(inquiryId, updatedInquiry);

    console.log(`Updated inquiry ${inquiryId} status to ${status}`);
    return c.json({ success: true, inquiry: updatedInquiry });
  } catch (error) {
    console.log(`Error updating inquiry status: ${error}`);
    return c.json({ error: "Failed to update inquiry" }, 500);
  }
});

// Delete inquiry (admin only)
app.delete("/make-server-0134e8c8/inquiry/:id", async (c) => {
  try {
    const adminKey = getAdminKey(c);

    if (adminKey !== "orivex_admin_2026") {
      console.log("Unauthorized admin access attempt");
      return c.json({ error: "Unauthorized" }, 401);
    }

    const inquiryId = c.req.param("id");
    await kv.del(inquiryId);

    console.log(`Deleted inquiry ${inquiryId}`);
    return c.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.log(`Error deleting inquiry: ${error}`);
    return c.json({ error: "Failed to delete inquiry" }, 500);
  }
});

// Get inquiry statistics (admin only)
app.get("/make-server-0134e8c8/stats", async (c) => {
  try {
    const adminKey = getAdminKey(c);

    if (adminKey !== "orivex_admin_2026") {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const inquiries = await kv.getByPrefix("inquiry_");

    const stats = {
      total: inquiries.length,
      new: inquiries.filter((i: any) => i.status === "new").length,
      inProgress: inquiries.filter((i: any) => i.status === "in-progress").length,
      completed: inquiries.filter((i: any) => i.status === "completed").length,
      byProjectType: inquiries.reduce((acc: any, inquiry: any) => {
        acc[inquiry.projectType] = (acc[inquiry.projectType] || 0) + 1;
        return acc;
      }, {})
    };

    return c.json({ success: true, stats });
  } catch (error) {
    console.log(`Error retrieving stats: ${error}`);
    return c.json({ error: "Failed to retrieve stats" }, 500);
  }
});

Deno.serve(app.fetch);
