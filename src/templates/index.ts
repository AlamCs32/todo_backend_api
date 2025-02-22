export const sendOtpTemplate: string = `
    <h1>Your OTP Code</h1>
    <p>Hello, {username},</p>
    <p>Your OTP code is: <strong>{otp}</strong></p>
    <p>Please use this code to complete your verification. The code will expire shortly.</p>
    <p>If you did not request this, please ignore this email.</p>

`

export const resetPasswordTemplate: string = `
    <h1>Password Reset Request</h1>
    <p>Hello, {username},</p>
    <p>It looks like you requested a password reset. Please click the link below to reset your password:</p>
    <p><a href="{resetLink}">Reset Password</a></p>
    <p><strong>Note:</strong> This link will expire in {expire}.</p>
    <p>If you did not request a password reset, you can ignore this email.</p>
    <p>Thank you!</p>
`;
