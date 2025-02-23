import { Router } from "express";
import * as todoController from "../controllers/todoController";
import * as todoValidation from "../validators/todoValidation";
import reqValidator from "../middlewares/request/reqValidator";
import { authenticateUser } from "../middlewares/request/authenticator";

const router: Router = Router();

router.post("/todo",
    authenticateUser,
    reqValidator(todoValidation.createTodo),
    todoController.createTodo
    /* 
        #swagger.path = '/todo'
        #swagger.method = 'post'
        #swagger.tags = ['Todo']
        #swagger.summary = 'Create a new todo item'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.security = [{ "BearerAuth": [] }]
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            title: { type: 'string', example: 'Buy groceries' },
                            description: { type: 'string', example: 'Buy milk, eggs, and bread' },
                            dueDate: { type: 'string', format: 'date', example: '2025-02-25' },
                            status: { type: 'string', enum: ['PENDING', 'COMPLETED'], example: 'PENDING' }
                        },
                        required: ['title', 'dueDate']
                    }
                }
            }
        }
        #swagger.responses[201] = { description: 'Todo created successfully' }
        #swagger.responses[400] = { description: 'Validation error' }
    */
);

router.get("/todo/status",
    authenticateUser,
    reqValidator(todoValidation.getTodoStatus),
    todoController.getTodStatus
    /* 
        #swagger.path = '/todo/status'
        #swagger.method = 'get'
        #swagger.tags = ['Todo']
        #swagger.summary = 'Get count of todos by status and overdue count'
        #swagger.security = [{ "BearerAuth": [] }]
        #swagger.parameters['dueDate'] = {
            in: 'query',
            description: 'Filter todos by due date format 2025-02-25',
            required: false
        }
    */
);


router.get("/todo",
    authenticateUser,
    reqValidator(todoValidation.getTodo),
    todoController.getTodo
    /* 
        #swagger.path = '/todo'
        #swagger.method = 'get'
        #swagger.tags = ['Todo']
        #swagger.summary = 'Get list of todos'
        #swagger.security = [{ "BearerAuth": [] }]
        #swagger.parameters['search'] = {
            in: 'query',
            description: 'Search todos by title or description',
            required: false,
            example: 'groceries'
        }
        #swagger.parameters['status'] = {
            in: 'query',
            description: 'Filter todos by status (PENDING, COMPLETED)',
            required: false,
            example: 'PENDING'
        }
        #swagger.parameters['dueDate'] = {
            in: 'query',
            description: 'Filter todos by due date (format: YYYY-MM-DD)',
            required: false,
            example: '2025-02-25'
        }
        #swagger.parameters['sortBy'] = {
            in: 'query',
            description: 'Sort todos by (updatedAt, createdAt, dueDate, title)',
            required: false,
            example: 'dueDate'
        }
        #swagger.parameters['sortType'] = {
            in: 'query',
            description: 'Sort order (asc, desc)',
            required: false,
            example: 'asc'
        }
        #swagger.parameters['pageNo'] = {
            in: 'query',
            description: 'Page number for pagination',
            required: false,
            example: 1
        }
        #swagger.parameters['pageSize'] = {
            in: 'query',
            description: 'Number of todos per page',
            required: false,
            example: 10
        }
        #swagger.responses[200] = { description: 'Todos fetched successfully' }
        #swagger.responses[400] = { description: 'Invalid request parameters' }
    */
);


router.patch("/todo/:todoId",
    authenticateUser,
    todoController.updateStatus
    /* 
        #swagger.path = '/todo/{todoId}'
        #swagger.method = 'patch'
        #swagger.tags = ['Todo']
        #swagger.summary = 'Update only the status of a todo'
        #swagger.security = [{ "BearerAuth": [] }]
        #swagger.parameters['todoId'] = {
            in: 'path',
            description: 'Todo ID to update',
            required: true
        }
        #swagger.responses[200] = { description: 'Todo status updated successfully' }
        #swagger.responses[404] = { description: 'Todo not found' }
    */
);

router.put("/todo/:todoId",
    authenticateUser,
    reqValidator(todoValidation.updateTodo),
    todoController.updateTodo
    /* 
        #swagger.path = '/todo/{todoId}'
        #swagger.method = 'put'
        #swagger.tags = ['Todo']
        #swagger.summary = 'Update an existing todo'
        #swagger.security = [{ "BearerAuth": [] }]
        #swagger.parameters['todoId'] = {
            in: 'path',
            description: 'Todo ID to update',
            required: true
        }
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            title: { type: 'string', example: 'Buy groceries' },
                            description: { type: 'string', example: 'Buy milk, eggs, and bread' },
                            dueDate: { type: 'string', format: 'date', example: '2025-02-25' },
                            status: { type: 'string', enum: ['PENDING', 'COMPLETED'], example: 'PENDING' }
                        },
                        required: ['title', 'dueDate']
                    }
                }
            }
        }
        #swagger.responses[200] = { description: 'Todo updated successfully' }
        #swagger.responses[400] = { description: 'Validation error' }
        #swagger.responses[404] = { description: 'Todo not found' }
    */
);

router.delete("/todo/:todoId",
    authenticateUser,
    todoController.deleteTodo
    /* 
        #swagger.path = '/todo/{todoId}'
        #swagger.method = 'delete'
        #swagger.tags = ['Todo']
        #swagger.summary = 'Delete a todo'
        #swagger.security = [{ "BearerAuth": [] }]
        #swagger.parameters['todoId'] = {
            in: 'path',
            description: 'Todo ID to delete',
            required: true
        }
        #swagger.responses[200] = { description: 'Todo deleted successfully' }
        #swagger.responses[404] = { description: 'Todo not found' }
    */
);

export default router;
