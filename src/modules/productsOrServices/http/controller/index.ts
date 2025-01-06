import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import {
  createProductOrServiceSchema,
  idSchema,
  productOrServiceSchema,
} from '../../validators/createBonusValidator';
import { CreateProductOrServiceUseCase } from '../../useCases/createProductOrServiceUseCase';
import { GetAllProductsOrServicesUseCase } from '../../useCases/getAllProductsOrServicesUseCase';
import { GetAllProductsUseCase } from '../../useCases/getAllProductsUseCase';
import { GetAllServicesUseCase } from '../../useCases/getAllServicesUseCase';
import { GetProductOrServiceByIdUseCase } from '../../useCases/getProductOrServiceByIdUseCase';
import { GetProductsOrServicesByCategoryUseCase } from '../../useCases/getProductsOrServicesByCategoryUseCase';
import { GetProductsOrServicesByNameUseCase } from '../../useCases/getProductsOrServicesByNameUseCase';
import { GetProductsOrServicesByTypeWithPaginationUseCase } from '../../useCases/getProductsOrServicesByTypeWithPaginationUseCase';
import { UpdateProductOrServiceUseCase } from '../../useCases/updateProductOrServiceUseCase';
import { CountProductOrServiceUseCase } from '../../useCases/countProductOrServiceUseCase';
import { CountProductsOrServicesByTypeUseCase } from '../../useCases/countProductsOrServicesByTypeUseCase';
import { DeleteProductOrServiceUseCase } from '../../useCases/deleteProductOrServiceUseCase';
import { ProductType } from '@prisma/client';
import { z } from 'zod';

export async function createProductOrServiceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { categoryId, name, price, quantity, type, description } =
      createProductOrServiceSchema.parse(request.body);

    const createProductOrServiceUseCase = container.resolve(
      CreateProductOrServiceUseCase,
    );

    const { data: productOrService } =
      await createProductOrServiceUseCase.execute({
        description,
        categoryId,
        name,
        price,
        quantity,
        type,
      });

    reply.status(201).send({
      message: 'Product or Service created successfully',
      data: productOrService,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllProductsOrServicesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { page = 1, limit = 10 } = request.query as {
      page?: number;
      limit?: number;
    };
    const getAllProductsOrServicesUseCase = container.resolve(
      GetAllProductsOrServicesUseCase,
    );

    const { data, total, currentPage, totalPages } =
      await getAllProductsOrServicesUseCase.execute(page, limit);

    reply.status(200).send({
      data,
      total,
      currentPage,
      totalPages,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { page = 1, limit = 10 } = request.query as {
      page?: number;
      limit?: number;
    };
    const getAllProductsUseCase = container.resolve(GetAllProductsUseCase);

    const { data, total, currentPage, totalPages } =
      await getAllProductsUseCase.execute(page, limit);

    reply.status(200).send({
      data,
      total,
      currentPage,
      totalPages,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllServicesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { page = 1, limit = 10 } = request.query as {
      page?: number;
      limit?: number;
    };
    const getAllServicesUseCase = container.resolve(GetAllServicesUseCase);

    const { data, total, currentPage, totalPages } =
      await getAllServicesUseCase.execute(page, limit);

    reply.status(200).send({
      data,
      total,
      currentPage,
      totalPages,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getProductOrServiceByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const getProductOrServiceByIdUseCase = container.resolve(
      GetProductOrServiceByIdUseCase,
    );

    const productOrService = await getProductOrServiceByIdUseCase.execute(id);

    reply.status(200).send({
      data: productOrService,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getProductsOrServicesByCategoryController(
  request: FastifyRequest<{ Params: { categoryId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { categoryId } = request.params;
    const getProductsOrServicesByCategoryUseCase = container.resolve(
      GetProductsOrServicesByCategoryUseCase,
    );

    const productsOrServices =
      await getProductsOrServicesByCategoryUseCase.execute(categoryId);

    reply.status(200).send({
      data: productsOrServices,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getProductsOrServicesByNameController(
  request: FastifyRequest<{ Querystring: { name: string } }>,
  reply: FastifyReply,
) {
  try {
    const { name } = request.query;

    const getProductsOrServicesByNameUseCase = container.resolve(
      GetProductsOrServicesByNameUseCase,
    );

    const productsOrServices =
      await getProductsOrServicesByNameUseCase.execute(name);

    reply.status(200).send(
      productsOrServices.map((item) => ({
        id: item.id,
        categoryId: item.categoryId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
      })),
    );
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(404)
      .send({ error: 'Resource not found', details: error.message });
  }
}

export async function getProductsOrServicesByTypeWithPaginationController(
  request: FastifyRequest<{ Params: { type: ProductType } }>,
  reply: FastifyReply,
) {
  try {
    const { type } = request.params;
    const { page = 1, limit = 10 } = request.query as {
      page?: number;
      limit?: number;
    };
    const getProductsOrServicesByTypeWithPaginationUseCase = container.resolve(
      GetProductsOrServicesByTypeWithPaginationUseCase,
    );

    const result =
      await getProductsOrServicesByTypeWithPaginationUseCase.execute(
        type,
        limit,
        (page - 1) * limit,
      );

    reply.status(200).send({
      data: result,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateProductOrServiceController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof productOrServiceSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);

    const { name, price, quantity, type, description, categoryId } =
      productOrServiceSchema.parse(request.body);

    const updateData: any = {};

    if (name) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (type) updateData.type = type;
    if (description) updateData.description = description;
    if (categoryId) updateData.categoryId = categoryId;
    const updateProductOrServiceUseCase = container.resolve(
      UpdateProductOrServiceUseCase,
    );

    const updatedProductOrService = await updateProductOrServiceUseCase.execute(
      {
        id,
        ...updateData,
      },
    );

    reply.status(200).send({
      message: 'Product or Service updated successfully',
      data: updatedProductOrService,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteProductOrServiceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const deleteProductOrServiceUseCase = container.resolve(
      DeleteProductOrServiceUseCase,
    );

    await deleteProductOrServiceUseCase.execute(id);

    reply.status(200).send({
      message: 'Product or Service deleted successfully',
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function countProductOrServiceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const countProductOrServiceUseCase = container.resolve(
      CountProductOrServiceUseCase,
    );

    const count = await countProductOrServiceUseCase.execute();

    reply.status(200).send({
      data: { count },
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function countProductsOrServicesByTypeController(
  request: FastifyRequest<{ Params: { type: ProductType } }>,
  reply: FastifyReply,
) {
  try {
    const { type } = request.params;
    const countProductsOrServicesByTypeUseCase = container.resolve(
      CountProductsOrServicesByTypeUseCase,
    );
    ('');

    const count = await countProductsOrServicesByTypeUseCase.execute(type);

    reply.status(200).send({
      data: { count },
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
