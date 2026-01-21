import { z } from "zod";

export const organisationSchema = z.object({
  // Core Identity
  name: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name too long")
    .trim(),
  
  // Licensing & Admin (AdminId is usually handled by the backend session)
  licenseKey: z.string().optional(), 
  
  // Demographics & Details
  nationality: z.string().min(2, "Please select a country").optional(),
  industry: z.string().min(2, "Please select an industry").optional(),
  
  organisationSize: z.enum([
    "1-10", 
    "11-50", 
    "51-200", 
    "201-500", 
    "501-1000", 
    "1000+"
  ], {
    errorMap: () => ({ message: "Please select a valid organization size" })
  }),

  purposeOfUse: z.string()
    .min(10, "Please provide a bit more detail on how you will use Siglyk")
    .max(500),

  orgbio: z.string()
    .max(1000, "Bio is too long")
    .optional(),

  // Employee Management (Usually initialized as empty arrays in Mongoose)
  // We include them here in case you want to bulk-upload during creation
  speakingEmployees: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  signLanguageEmployees: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
});

export const orgCredentialSchema = z.object({
  // The ID of the user being added to the organization
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),
  
  // The ID of the organization they are joining
  orgId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Org ID"),
  
  // The temporary password assigned by the Admin
  assignedPassword: z.string()
    .min(8, "Temporary password must be at least 8 characters")
    .regex(/[0-9]/, "Must contain at least one number"),
    
  // The minute limit for this specific employee
  allowedMinutes: z.number()
    .min(0, "Minutes cannot be negative")
    .max(10000, "Limit exceeds maximum allowed")
    .default(0),
});


