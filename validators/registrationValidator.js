import { z } from 'zod';

export const registrationSchema = z.object({
  teamName: z.string()
    .min(3, 'Team name must be at least 3 characters')
    .max(50, 'Team name must not exceed 50 characters')
    .trim(),
  
  leaderName: z.string()
    .min(2, 'Leader name must be at least 2 characters')
    .max(50, 'Leader name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Leader name must contain only letters and spaces')
    .trim(),
  
  branch: z.string()
    .min(2, 'Branch must be at least 2 characters')
    .max(50, 'Branch must not exceed 50 characters')
    .trim(),
  
  leaderRegdNo: z.string()
    .min(5, 'Registration number must be at least 5 characters')
    .max(20, 'Registration number must not exceed 20 characters')
    .trim(),
  
  teamSize: z.string()
    .refine((val) => val === '4' || val === '5', {
      message: 'Team size must be 4 or 5'
    })
    .transform((val) => parseInt(val)),
  
  member2: z.string()
    .min(2, 'Member 2 name must be at least 2 characters')
    .max(50, 'Member 2 name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Member 2 name must contain only letters and spaces')
    .trim(),
  
  member3: z.string()
    .min(2, 'Member 3 name must be at least 2 characters')
    .max(50, 'Member 3 name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Member 3 name must contain only letters and spaces')
    .trim(),
  
  member4: z.string()
    .min(2, 'Member 4 name must be at least 2 characters')
    .max(50, 'Member 4 name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Member 4 name must contain only letters and spaces')
    .trim(),
  
  member5: z.preprocess(
    (val) => {
      // Handle undefined, null, or empty string
      if (val === undefined || val === null || val === '') return '';
      return String(val).trim();
    },
    z.string()
      .refine(val => {
        // Empty is always valid
        if (val === '') return true;
        // If not empty, must be 2-50 chars and letters only
        return val.length >= 2 && val.length <= 50 && /^[a-zA-Z\s]+$/.test(val);
      }, {
        message: 'Member 5 name must be 2-50 characters with letters and spaces only, or empty'
      })
  )
});

export const validateRegistration = (data) => {
  return registrationSchema.safeParse(data);
};
