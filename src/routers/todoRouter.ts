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
            description: 'Filter todos by due date',
            required: false,
            schema: { type: 'string', format: 'date', example: '2025-02-25' }
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
            schema: { type: 'string', example: 'groceries' }
        }
        #swagger.parameters['status'] = {
            in: 'query',
            description: 'Filter todos by status',
            required: false,
            schema: { type: 'string', enum: ['PENDING', 'COMPLETED'], example: 'PENDING' }
        }
        #swagger.parameters['dueDate'] = {
            in: 'query',
            description: 'Filter todos by due date',
            required: false,
            schema: { type: 'string', format: 'date', example: '2025-02-25' }
        }
        #swagger.parameters['sortBy'] = {
            in: 'query',
            description: 'Sort todos by field',
            required: false,
            schema: { type: 'string', enum: ['updatedAt', 'createdAt', 'dueDate', 'title'], example: 'dueDate' }
        }
        #swagger.parameters['sortType'] = {
            in: 'query',
            description: 'Sort order',
            required: false,
            schema: { type: 'string', enum: ['asc', 'desc'], example: 'asc' }
        }
        #swagger.responses[200] = {
            description: 'Todos fetched successfully'
        }
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
            required: true,
            schema: { type: 'integer', example: 1 }
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
            required: true,
            schema: { type: 'integer', example: 1 }
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
            required: true,
            schema: { type: 'integer', example: 1 }
        }
        #swagger.responses[200] = { description: 'Todo deleted successfully' }
        #swagger.responses[404] = { description: 'Todo not found' }
    */
);

export default router;
