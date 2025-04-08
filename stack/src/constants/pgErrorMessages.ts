export const PG_ERROR_MESSAGES: Record<
  string,
  { status: number; message: string }
> = {
  "23505": {
    status: 409,
    message: "Email already exists",
  },
  "23503": {
    status: 400,
    message: "Foreign key constraint failed",
  },
};
