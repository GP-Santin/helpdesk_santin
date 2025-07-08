import { z } from "zod";

const santinEmployeeSchema = z.object({
  nome: z.string(),
  matricula: z.string(),
  empresa: z.string(),
  status: z.boolean(),
  cpf: z.string(),
  projeto: z.string(),
  dtAdmissao: z.coerce.date(),
  dtCriacao: z.date(),
  dtAtualizacao: z.date().nullable(),
});

const createSantinEmployeeSchema = santinEmployeeSchema.omit({
  dtCriacao: true,
  dtAtualizacao: true,
});

const updateSantinEmployeeSchema = santinEmployeeSchema.omit({
  dtCriacao: true,
  dtAtualizacao: true,
});

export const upsertSantinContractSchema = z
  .object({
    id: z.number().nullish(),
    nrContrato: z.string({
      required_error: "Número do contrato é obrigatório",
    }),
    parceiroId: z.number({
      required_error: "Parceiro é obrigatório",
    }),
    projetoId: z.number(),
    dispositivos: z
      .array(
        z.object({
          id: z.number(),
          nome: z.string().nullish(),
          serialDispositivo: z.string().nullish(),
          cdVerificacao: z.string().nullish(),
          st: z.boolean().nullish(),
        })
      )
      .nullish(),
    inicioContrato: z.coerce.date(),
    fimContrato: z.coerce.date().nullish(),
    tipoContratoId: z.number(),
    st: z.boolean().default(true).nullish(),
  })
  .extend({
    tipoContrato: z
      .object({
        id: z.number(),
        dcTipoContrato: z.string(),
      })
      .nullish(),
    parceiro: z
      .object({
        id: z.number(),
        razaoSocial: z.string(),
        cnpj: z.string(),
      })
      .nullish(),
    projeto: z
      .object({
        id: z.number(),
        dcProjeto: z.string(),
      })
      .nullish(),
  });

export const upsertSantinContractTypeSchema = z.object({
  id: z.number().nullish(),
  dcTipoContrato: z.string(),
  identificadorId: z.number(),
  st: z.boolean().default(true),
});

const upsertSantinDeviceSchema = z.object({
  id: z.number().nullish(),
  nome: z.string().min(1, {
    message: "Nome do dispositivo é obrigatório",
  }),
  serialDispositivo: z
    .string()
    .min(1, {
      message: "Serial do dispositivo é obrigatório",
    })
    .max(100, {
      message: "Serial do dispositivo deve ter no máximo 100 caracteres",
    }),
  cdVerificacao: z
    .string()
    .min(1, {
      message: "Código de verificação é obrigatório",
    })
    .max(100, {
      message: "Código de verificação deve ter no máximo 100 caracteres",
    }),
  st: z.boolean().default(true),
});

const santinDeviceVinculateSchema = z.object({
  id: z.number(),
  dispositivoId: z.number(),
  contratoId: z.number(),
  st: z.boolean(),
  dtCriacao: z.date(),
  dtAtualizacao: z.date().nullable(),
});

const santinDeviceVinculateCreateSchema = z.object({
  nome: z.string(),
  dispositivoId: z.number(),
  contratoId: z.number(),
  st: z.boolean().default(true),
});

const upsertSantinPartnerSchema = z.object({
  id: z.number().nullish(),
  razaoSocial: z
    .string({ required_error: "Razão social é obrigatório" })
    .min(1, {
      message: "Razão social é obrigatório",
    }),
  nomeFantasia: z
    .string({ required_error: "Nome fantasia é obrigatório" })
    .min(1, {
      message: "Nome fantasia é obrigatório",
    }),
  cnpj: z.string({ required_error: "CNPJ é obrigatório" }).min(1, {
    message: "CNPJ é obrigatório",
  }),
  logradouro: z.string({ required_error: "Logradouro é obrigatório" }).min(1, {
    message: "Logradouro é obrigatório",
  }),
  endereco: z.string({ required_error: "Endereço é obrigatório" }).min(1, {
    message: "Endereço é obrigatório",
  }),
  nr: z.string({ required_error: "Número é obrigatório" }).min(1, {
    message: "Número é obrigatório",
  }),
  complemento: z.string().optional(),
  bairro: z.string({ required_error: "Bairro é obrigatório" }).min(1, {
    message: "Bairro é obrigatório",
  }),
  cep: z
    .string()
    .min(1, {
      message: "CEP é obrigatório",
    })
    .refine(
      (cep) => {
        return /^\d{5}-\d{3}$/.test(cep);
      },
      {
        message: "CEP inválido",
      }
    )
    .refine((cep) => {
      return cep.replace("-", "").length === 8;
    }),
  municipioId: z.number({ required_error: "Município é obrigatório" }).min(1, {
    message: "Município é obrigatório",
  }),
  ufId: z.number({ required_error: "UF é obrigatório" }).min(1, {
    message: "UF é obrigatório",
  }),
  pessoaContato: z
    .string({ required_error: "Pessoa contato é obrigatório" })
    .min(1, {
      message: "Pessoa contato é obrigatório",
    }),
  contatoPrincipal: z
    .string({ required_error: "Contato principal é obrigatório" })
    .min(1, {
      message: "Contato principal é obrigatório",
    }),
  st: z.boolean().default(true),
});

const upsertSantinMealValueSchema = z
  .object({
    id: z.number().nullish(),
    contratoId: z.number({ required_error: "Contrato é obrigatório" }),
    vlUnitarioCafe: z.number({ required_error: "Valor do café é obrigatório" }),
    vlUnitarioAlmoco: z.number({
      required_error: "Valor do almoço é obrigatório",
    }),
    vlUnitarioJanta: z.number({
      required_error: "Valor da janta é obrigatório",
    }),
    vlUnitarioMarmitaP: z.number().nullish(),
    vlUnitarioMarmitaM: z.number().nullish(),
    vlUnitarioMarmitaG: z.number().nullish(),
    dtInicioVigencia: z.coerce.date({
      required_error: "Data de início da vigência é obrigatória",
    }),
    dtFimVigencia: z.coerce.date({
      required_error: "Data de fim da vigência é obrigatória",
      message: "Data de fim da vigência é obrigatória",
    }),
  })
  .extend({
    contrato: z
      .object({
        id: z.number(),
        nrContrato: z.string(),
        parceiro: z
          .object({
            id: z.number(),
            razaoSocial: z.string(),
            cnpj: z.string(),
          })
          .nullish(),
      })
      .nullish(),
  });

const upsertSantinContractTypeIdentifierSchema = z.object({
  id: z.number().nullish(),
  dcIdentificador: z.string(),
  st: z.boolean().default(true),
  usuarioId: z.number().nullish(),
  dtCriacao: z.date().nullish(),
  dtAtualizacao: z.date().nullable().nullish(),
});

export {
  createSantinEmployeeSchema,
  santinDeviceVinculateCreateSchema,
  santinDeviceVinculateSchema,
  santinEmployeeSchema,
  updateSantinEmployeeSchema,
  upsertSantinContractTypeIdentifierSchema,
  upsertSantinDeviceSchema,
  upsertSantinMealValueSchema,
  upsertSantinPartnerSchema,
};
