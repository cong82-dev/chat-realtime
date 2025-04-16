export const ERROR_MESSAGE = Object.freeze({
  AUTH: {
    EMAIL_NOT_FOUND: 'Email not found',
    INVALID_PASSWORD: 'Invalid password',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    ACCOUNT_NOT_FOUND: 'Account not found',
    TOKEN_GENERATION_FAILED: 'Token generation failed',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  },
  FRIENDSHIPS: {
    FRIEND_REQUEST_EXISTS: 'Friend request already exists.',
    FRIEND_REQUEST_NOT_FOUND: 'Friend request not found.',
    FRIEND_REQUEST_ALREADY_ACCEPTED: 'Friend request already accepted.',
    FRIEND_REQUEST_FAILED: 'Friend request creation failed.',
    INVALID_ACTION: 'Invalid action. Please use "accept" or "reject".',
  },
});

export const SUCCESS_MESSAGE = Object.freeze({
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    REGISTER_SUCCESS: 'Registration successful',
    LOGOUT_SUCCESS: 'Logout successful',
    UPDATE_REFRESH_TOKEN_SUCCESS: 'Refresh token updated successfully',
  },
  FRIENDSHIPS: {
    FRIEND_REQUEST_SENT: 'Friend request sent successfully',
    FRIEND_REQUEST_RESPONSE: 'Friend request response updated successfully.',
    FRIEND_REQUEST_CANCELLED: 'Friend request cancelled successfully.',
  },
});

export const ERROR_TYPES_MESSAGE = Object.freeze({
  VALIDATE_ERROR: 'Validation failed',
});
