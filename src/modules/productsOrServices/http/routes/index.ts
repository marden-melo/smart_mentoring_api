import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createProductOrServiceController,
  getAllProductsOrServicesController,
  getAllProductsController,
  getAllServicesController,
  getProductOrServiceByIdController,
  getProductsOrServicesByCategoryController,
  getProductsOrServicesByNameController,
  getProductsOrServicesByTypeWithPaginationController,
  updateProductOrServiceController,
  deleteProductOrServiceController,
  countProductOrServiceController,
  countProductsOrServicesByTypeController,
} from '../controller';

export async function productOrServiceRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/product-or-service',
    {
      schema: {
        description: 'Create a new product or service',
        tags: ['ProductOrService'],
        body: {
          type: 'object',
          properties: {
            categoryId: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'number' },
            quantity: { type: 'number' },
            type: { type: 'string', enum: ['PRODUCT', 'SERVICE'] },
            description: { type: 'string' },
          },
          required: ['categoryId', 'name', 'price', 'quantity', 'type'],
        },
        response: {
          201: {
            description: 'Product or Service created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  categoryId: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  quantity: { type: 'number' },
                  type: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    createProductOrServiceController,
  );

  app.get(
    '/products-or-services',
    {
      schema: {
        description: 'Retrieve all products or services',
        tags: ['ProductOrService'],
        response: {
          200: {
            description: 'List of products or services',
            type: 'object',
            properties: {
              total: { type: 'number' },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    categoryId: { type: 'string' },
                    category: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                      },
                    },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'number' },
                    type: { type: 'string' },
                    description: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getAllProductsOrServicesController,
  );

  app.get(
    '/products',
    {
      schema: {
        description: 'Retrieve all products',
        tags: ['ProductOrService'],
        response: {
          200: {
            description: 'List of products',
            type: 'object',
            properties: {
              total: { type: 'number' },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    categoryId: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'number' },
                    description: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getAllProductsController,
  );

  app.get(
    '/services',
    {
      schema: {
        description: 'Retrieve all services',
        tags: ['ProductOrService'],
        response: {
          200: {
            description: 'List of services',
            type: 'object',
            properties: {
              total: { type: 'number' },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    categoryId: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'number' },
                    description: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getAllServicesController,
  );

  app.get(
    '/product-or-service/:id',
    {
      schema: {
        description: 'Retrieve product or service by ID',
        tags: ['ProductOrService'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Product or Service details',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  categoryId: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  quantity: { type: 'number' },
                  type: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    getProductOrServiceByIdController,
  );

  app.put(
    '/product-or-service/:id',
    {
      schema: {
        description: 'Update a product or service',
        tags: ['ProductOrService'],
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
            name: { type: 'string' },
            price: { type: 'number' },
            quantity: { type: 'number' },
            type: { type: 'string' },
            description: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Product or Service updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  categoryId: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  quantity: { type: 'number' },
                  type: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    updateProductOrServiceController,
  );

  app.delete(
    '/product-or-service/:id',
    {
      schema: {
        description: 'Delete a product or service',
        tags: ['ProductOrService'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Product or Service deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteProductOrServiceController,
  );

  app.get(
    '/product-or-service/count',
    {
      schema: {
        description: 'Count total products or services',
        tags: ['ProductOrService'],
        response: {
          200: {
            description: 'Total count of products or services',
            type: 'object',
            properties: {
              count: { type: 'number' },
            },
          },
        },
      },
    },
    countProductOrServiceController,
  );

  app.get(
    '/products-or-services-by-name',
    {
      schema: {
        description: 'Retrieve products or services by name',
        tags: ['ProductOrService'],
        querystring: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
        response: {
          200: {
            description: 'List of products or services by name',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                categoryId: { type: 'string' },
                name: { type: 'string' },
                price: { type: 'number' },
                quantity: { type: 'number' },
                description: { type: 'string' },
              },
              required: [
                'id',
                'categoryId',
                'name',
                'price',
                'quantity',
                'description',
              ],
            },
          },
        },
      },
    },
    getProductsOrServicesByNameController,
  );
}
