import { Router } from "express";
import * as userController from "../controllers/userController"
import * as userValidation from "../validators/userValidation"
import reqValidator from "../middlewares/request/reqValidator";
import { authenticateUser } from "../middlewares/request/authenticator";

const router: Router = Router()

router.post("/signup",
    reqValidator(userValidation.singup),
    userController.singup
    /*
        #swagger.path = '/signup'
        #swagger.method = 'post'
        #swagger.tags = ['User']
        #swagger.summary = 'User Signup'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            username: { type: 'string', example: 'user123' },
                            email: { type: 'string', example: 'user@example.com' },
                            password: { type: 'string', example: 'Password123!' }
                        },
                        required: ['username', 'email', 'password']
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'User successfully created'
        }
        #swagger.responses[400] = {
            description: 'Invalid data provided'
        }
    */
)

router.post("/login",
    reqValidator(userValidation.login),
    userController.login
    /*
        #swagger.path = '/login'
        #swagger.method = 'post'
        #swagger.tags = ['User']
        #swagger.summary = 'User Login'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string', example: 'user@example.com' },
                            password: { type: 'string', example: 'Password123!' }
                        },
                        required: ['email', 'password']
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Successful login, returns JWT token',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..' }
                        }
                    }
                }
            }
        }
        #swagger.responses[400] = {
            description: 'Invalid email or password'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
)

router.put("/change-password",
    authenticateUser,
    reqValidator(userValidation.changePassword),
    userController.changePassword
    /*
        #swagger.path = '/change-password'
        #swagger.method = 'put'
        #swagger.tags = ['User']
        #swagger.summary = 'Change user password'
        #swagger.description = 'Allows authenticated users to change their password.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            oldPassword: { type: 'string', example: 'OldPassword123!' },
                            password: { type: 'string', example: 'NewPassword123!' },
                            confirmPassword: { type: 'string', example: 'NewPassword123!' }
                        },
                        required: ['oldPassword', 'password', 'confirmPassword']
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Password changed successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid old password or mismatched new passwords'
        }
        #swagger.responses[401] = {
            description: 'Unauthorized, token required'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
);

router.post("/forget-password",
    reqValidator(userValidation.forgetPassword),
    userController.forgetPassword
    /*
        #swagger.path = '/forget-password'
        #swagger.method = 'post'
        #swagger.tags = ['User']
        #swagger.summary = 'Request password reset'
        #swagger.description = 'Sends a password reset link to the provided email address.'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string', example: 'user@example.com' }
                        },
                        required: ['email']
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Password reset link sent successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid email or email not registered'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
);

router.post("/reset-password/:token",
    reqValidator(userValidation.resetPassword),
    userController.resetPassword
    /*
        #swagger.path = '/reset-password/{token}'
        #swagger.method = 'post'
        #swagger.tags = ['User']
        #swagger.summary = 'Reset user password'
        #swagger.description = 'Allows users to reset their password using a token received via email.'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['token'] = {
            in: 'path',
            required: true,
            type: 'string',
            description: 'Password reset token'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            password: { type: 'string', example: 'NewPassword123!' },
                            confirmPassword: { type: 'string', example: 'NewPassword123!' }
                        },
                        required: ['password', 'confirmPassword']
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Password reset successfully'
        }
        #swagger.responses[400] = {
            description: 'Invalid or expired token'
        }
        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
);


export default router