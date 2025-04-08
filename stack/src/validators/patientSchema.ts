import Joi from "joi";

export const patientSchema = Joi.object({
  full_name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "Full name must contain only letters and spaces",
      "any.required": "Full name is required",
    }),

  email: Joi.string()
    .email()
    .pattern(/@gmail\.com$/)
    .required()
    .messages({
      "string.pattern.base": "Email must be a valid @gmail.com address",
      "any.required": "Email is required",
    }),

  phone_country_code: Joi.string()
    .pattern(/^\+\d{1,4}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone code must be like +598",
      "any.required": "Phone code is required",
    }),

  phone_number: Joi.string()
    .pattern(/^\d{6,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be numeric and 6-15 digits",
      "any.required": "Phone number is required",
    }),
});
