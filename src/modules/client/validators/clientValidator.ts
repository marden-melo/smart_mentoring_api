import { z } from 'zod';

const createClientSchema = z
  .object({
    clientType: z.enum(['COMPANY', 'INDIVIDUAL']),
    email: z.string().email(),
    phone: z.string(),
    cep: z.string(),
    city: z.string(),
    cnpj: z.string().optional(),
    companyName: z.string().optional(),
    cpf: z.string().optional(),
    fullName: z.string(),
    district: z.string(),
    number: z.string(),
    state: z.string(),
    street: z.string(),
    responsable: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.clientType === 'COMPANY') {
        return data.cnpj && !data.cpf;
      }
      if (data.clientType === 'INDIVIDUAL') {
        return data.cpf && !data.cnpj && data.cpf.length === 11;
      }
      return true;
    },
    {
      message: 'CPF ou CNPJ devem ser fornecidos corretamente.',
      path: ['cpf', 'cnpj'],
    },
  );

export default createClientSchema;
