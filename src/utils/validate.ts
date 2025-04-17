// utils/validation.ts

function validateRequiredFields<T>(payload: T, requiredFields: (Extract<keyof T, string>)[]): void {
  for (const field of requiredFields) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === '') {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

export { validateRequiredFields };