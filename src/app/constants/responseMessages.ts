export const RESPONSE_MESSAGES = {
    SUCCESS: 'Request successful',
    FETCHED: 'Resource fetched successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    CREATED: 'Resource created successfully',

    VALIDATION_ERROR: 'Validation failed',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    FORBIDDEN: 'Access denied',
    NOT_FOUND: 'Resource not found',

    SERVER_ERROR: 'Something went wrong',
} as const;
