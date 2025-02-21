type MessageCode = 200 | 201 | 400 | 401 | 403 | 404 | 406 | 409 | 426 | 500;

type Message = {
    [key: number]: {
        message: string;
        httpCode: number;
        status: boolean;
    };
} & {
    [key in MessageCode]: {
        message: string;
        httpCode: number;
        status: boolean;
    };
};

const message: Message = {
    200: {
        message: "Success",
        httpCode: 200,
        status: true,
    },
    201: {
        message: "Data Created Successfully.",
        httpCode: 201,
        status: true,
    },
    400: {
        message: "Bad Request",
        httpCode: 400,
        status: false,
    },
    401: {
        message: "User Not Authorized",
        httpCode: 401,
        status: false,
    },
    403: {
        message: "Forbidden",
        httpCode: 403,
        status: false,
    },
    404: {
        message: "Not Found",
        httpCode: 404,
        status: false,
    },
    406: {
        message: "Joi Validation Error",
        httpCode: 406,
        status: false,
    },
    409: {
        message: "Conflict",
        httpCode: 409,
        status: false,
    },
    426: {
        message: "Upgrade required.",
        httpCode: 426,
        status: false,
    },
    500: {
        message: "Internal Server Error",
        httpCode: 500,
        status: false,
    },
};

export default message;
