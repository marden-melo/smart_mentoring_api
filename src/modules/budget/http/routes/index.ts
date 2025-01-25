import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createBudgetController,
  addBudgetHistoryController,
  addItemToBudgetController,
  deleteBudgetController,
  getBudgetByIdController,
  getBudgetHistoryController,
  getBudgetsByClientIdController,
  getBudgetsByUserIdController,
  getItemsByBudgetIdController,
  removeItemFromBudgetController,
  updateBudgetStatusController,
  updateBudgetController,
} from '../controller';

export async function budgetRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'Budget',
    type: 'object',
    properties: {
      id: { type: 'string' },
      clientId: { type: 'string' },
      userId: { type: 'string' },
      title: { type: 'string' },
      total: { type: 'number' },
      status: { type: 'string' },
    },
    required: [],
  });

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/budget',
    {
      schema: {
        description: 'Create a new budget with items and documents',
        tags: ['Budget'],
        body: {
          type: 'object',
          properties: {
            budgetNumber: { type: 'string' },
            clientId: { type: 'string' },
            userId: { type: 'string' },
            title: { type: 'string' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'string' },
                  quantity: { type: 'number' },
                  unitPrice: { type: 'number' },
                  totalPrice: { type: 'number' },
                },
                required: ['productId', 'quantity', 'unitPrice'],
              },
            },
            total: { type: 'number' },
            status: { type: 'string' },
            discountPercent: { type: 'number', nullable: true },
            discountValue: { type: 'number', nullable: true },
            subTotal: { type: 'number', nullable: true },
            paymentType: { type: 'string' },
            installments: { type: 'number', nullable: true },
            additionalNotes: { type: 'string', nullable: true },
            bonusId: { type: 'string', nullable: true },
            documents: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  fileName: { type: 'string' },
                  fileType: { type: 'string' },
                  filePath: { type: 'string' },
                },
                required: ['fileName', 'fileType', 'filePath'],
              },
              nullable: true,
            },
          },
          required: [
            'budgetNumber',
            'clientId',
            'userId',
            'title',
            'items',
            'total',
            'status',
          ],
        },
      },
    },
    createBudgetController,
  );

  app.post(
    '/budget/history',
    {
      schema: {
        description: 'Add history entry to a budget',
        tags: ['Budget'],
        body: {
          type: 'object',
          properties: {
            budgetId: { type: 'string' },
            description: { type: 'string' },
            userId: { type: 'string' },
            changeType: { type: 'string' },
          },
          required: ['budgetId', 'description', 'userId', 'changeType'],
        },
        response: {
          200: {
            description: 'Budget history added successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    addBudgetHistoryController,
  );

  app.post(
    '/budget/:budgetId/item',
    {
      schema: {
        description: 'Add an item to a budget',
        tags: ['Budget'],
        body: {
          type: 'object',
          properties: {
            budgetItem: {
              type: 'object',
              properties: {
                productId: { type: 'string' },
                quantity: { type: 'number' },
                unitPrice: { type: 'number' },
              },
              required: ['productId', 'quantity', 'unitPrice'],
            },
          },
          required: ['budgetItem'],
        },
        response: {
          200: {
            description: 'Item added to budget successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Budget#' },
            },
          },
        },
      },
    },
    addItemToBudgetController,
  );

  app.delete(
    '/budget/:id',
    {
      schema: {
        description: 'Delete a budget by ID',
        tags: ['Budget'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Budget deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteBudgetController,
  );

  app.get(
    '/budget/:id',
    {
      schema: {
        description: 'Retrieve a budget by ID with items',
        tags: ['Budget'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Budget retrieved successfully with items',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  budgetNumber: { type: 'string' },
                  clientId: { type: 'string' },
                  userId: { type: 'string' },
                  title: { type: 'string' },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        budgetId: { type: 'string' },
                        productId: { type: 'string' },
                        quantity: { type: 'number' },
                        unitPrice: { type: 'number' },
                        totalPrice: { type: 'number' },
                      },
                    },
                  },
                  total: { type: 'number' },
                  status: { type: 'string' },
                  discountPercent: { type: 'number', nullable: true },
                  discountValue: { type: 'number', nullable: true },
                  subTotal: { type: 'number', nullable: true },
                  paymentType: { type: 'string' },
                  installments: { type: 'number', nullable: true },
                  additionalNotes: { type: 'string', nullable: true },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    getBudgetByIdController,
  );

  app.get(
    '/budget/:budgetId/history',
    {
      schema: {
        description: 'Retrieve history for a budget',
        tags: ['Budget'],
        params: {
          type: 'object',
          properties: {
            budgetId: { type: 'string' },
          },
          required: ['budgetId'],
        },
        response: {
          200: {
            description: 'Budget history retrieved successfully',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                changeType: { type: 'string' },
                description: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
    getBudgetHistoryController,
  );

  app.get(
    '/budgets/client',
    {
      schema: {
        description: 'Retrieve budgets by client ID with items',
        tags: ['Budget'],
        querystring: {
          type: 'object',
          properties: {
            clientId: { type: 'string' },
            page: { type: 'number' },
            limit: { type: 'number' },
          },
          required: ['clientId'],
        },
        response: {
          200: {
            description: 'Budgets retrieved successfully with items',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                    budgetNumber: { type: 'string' },
                    title: { type: 'string' },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          budgetId: { type: 'string' },
                          productId: { type: 'string' },
                          quantity: { type: 'number' },
                          unitPrice: { type: 'number' },
                          totalPrice: { type: 'number' },
                        },
                      },
                    },
                    description: { type: 'string' },
                    status: { type: 'string' },
                    discountPercent: { type: 'number', nullable: true },
                    discountValue: { type: 'number', nullable: true },
                    subTotal: { type: 'number' },
                    total: { type: 'number' },
                    userId: { type: 'string' },
                    bonusId: { type: 'string', nullable: true },
                    paymentType: { type: 'string' },
                    installments: { type: 'number', nullable: true },
                    additionalNotes: { type: 'string', nullable: true },
                    clientId: { type: 'string' },
                  },
                },
              },
              total: { type: 'number' },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
        },
      },
    },
    getBudgetsByClientIdController,
  );

  app.get(
    '/budgets/user',
    {
      schema: {
        description: 'Retrieve budgets by user ID with items',
        tags: ['Budget'],
        querystring: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            page: { type: 'number' },
            limit: { type: 'number' },
          },
          required: ['userId'],
        },
        response: {
          200: {
            description: 'Budgets retrieved successfully with items',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                    budgetNumber: { type: 'string' },
                    title: { type: 'string' },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          budgetId: { type: 'string' },
                          productId: { type: 'string' },
                          quantity: { type: 'number' },
                          unitPrice: { type: 'number' },
                          totalPrice: { type: 'number' },
                        },
                      },
                    },
                    description: { type: 'string' },
                    status: { type: 'string' },
                    discountPercent: { type: 'number', nullable: true },
                    discountValue: { type: 'number', nullable: true },
                    subTotal: { type: 'number' },
                    total: { type: 'number' },
                    userId: { type: 'string' },
                    bonusId: { type: 'string', nullable: true },
                    paymentType: { type: 'string' },
                    installments: { type: 'number', nullable: true },
                    additionalNotes: { type: 'string', nullable: true },
                    clientId: { type: 'string' },
                  },
                },
              },
              total: { type: 'number' },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
        },
      },
    },
    getBudgetsByUserIdController,
  );

  app.get(
    '/budget/:budgetId/items',
    {
      schema: {
        description: 'Retrieve items for a specific budget',
        tags: ['Budget'],
        params: {
          type: 'object',
          properties: {
            budgetId: { type: 'string' },
          },
          required: ['budgetId'],
        },
        response: {
          200: {
            description: 'Items retrieved successfully for the budget',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                quantity: { type: 'number' },
                price: { type: 'number' },
              },
            },
          },
        },
      },
    },
    getItemsByBudgetIdController,
  );

  app.delete(
    '/budget/:budgetId/item/:itemId',
    {
      schema: {
        description: 'Remove an item from a budget',
        tags: ['Budget'],
        params: {
          type: 'object',
          properties: {
            budgetId: { type: 'string' },
            itemId: { type: 'string' },
          },
          required: ['budgetId', 'itemId'],
        },
        response: {
          200: {
            description: 'Item removed from budget successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    removeItemFromBudgetController,
  );

  app.patch(
    '/budget/status',
    {
      schema: {
        description: 'Update the status of a budget',
        tags: ['Budget'],
        body: {
          type: 'object',
          properties: {
            budgetId: { type: 'string' },
            status: { type: 'string' },
          },
          required: ['budgetId', 'status'],
        },
        response: {
          200: {
            description: 'Budget status updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    updateBudgetStatusController,
  );

  app.put(
    '/budget/:id',
    {
      schema: {
        description: 'Update an existing budget by ID',
        tags: ['Budget'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            budgetNumber: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string' },
            discountPercent: { type: 'number', nullable: true },
            discountValue: { type: 'number', nullable: true },
            subTotal: { type: 'number', nullable: true },
            total: { type: 'number' },
            paymentType: { type: 'string' },
            installments: { type: 'number', nullable: true },
            additionalNotes: { type: 'string', nullable: true },
            bonusId: { type: 'string', nullable: true },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'string' },
                  quantity: { type: 'number' },
                  unitPrice: { type: 'number' },
                  totalPrice: { type: 'number' },
                },
                required: ['productId', 'quantity', 'unitPrice'],
              },
              nullable: true,
            },
            documents: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  fileName: { type: 'string' },
                  fileType: { type: 'string' },
                  filePath: { type: 'string' },
                },
                required: ['fileName', 'fileType', 'filePath'],
              },
              nullable: true,
            },
          },
          required: ['budgetNumber', 'title', 'status', 'total'],
        },
        response: {
          200: {
            description: 'Budget updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  budgetNumber: { type: 'string' },
                  clientId: { type: 'string' },
                  userId: { type: 'string' },
                  title: { type: 'string' },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        budgetId: { type: 'string' },
                        productId: { type: 'string' },
                        quantity: { type: 'number' },
                        unitPrice: { type: 'number' },
                        totalPrice: { type: 'number' },
                      },
                    },
                  },
                  total: { type: 'number' },
                  status: { type: 'string' },
                  discountPercent: { type: 'number', nullable: true },
                  discountValue: { type: 'number', nullable: true },
                  subTotal: { type: 'number', nullable: true },
                  paymentType: { type: 'string' },
                  installments: { type: 'number', nullable: true },
                  additionalNotes: { type: 'string', nullable: true },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    updateBudgetController,
  );
}
