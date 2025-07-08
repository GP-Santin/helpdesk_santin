import { z } from "zod";
import {
  createSantinEmployeeSchema,
  updateSantinEmployeeSchema,
  upsertSantinContractSchema,
  upsertSantinMealValueSchema,
} from "./santin.schema";

interface SantinLoginResponse {
  token: string;
  expiresAt: string;
}

interface SantinLoginInput {
  email: string;
  senha: string;
}

interface SantinLoginErrorResponse {
  code: number;
  error: string;
}

interface SantinMealDTO {
  id: number;
  colaboradorId: number;
  tipo: MealType;
  status: string;
  dataHora: Date;
  origem: string;
  justificativa: string | null;
  projetoId: number | null;
  empresaId: number;
  dtCriacao: Date;
  dtAtualizacao: Date | null;
  colaborador: SantinMealEmployeeDTO;
}

interface CreateMealInput {
  colaboradorId: number;
  tipo: MealType;
  status: MealStatus;
  dataHora: Date;
  origem: MealOrigin;
  justificativa: string | null;
  projetoId: number | null;
  dispositivoId?: string | null;
}

export enum MealType {
  CAFE_DA_MANHA = "Café da Manhã",
  ALMOCO = "Almoço",
  JANTA = "Janta",
  MARMITA_P = "Marmita P",
  MARMITA_M = "Marmita M",
  MARMITA_G = "Marmita G",
}

export enum MealOrigin {
  RECONHECIMENTO_FACIAL = "Facial",
  MANUAL = "Manual",
  JORNADA = "Jornada",
}

export enum MealStatus {
  CONSUMIDO = "Realizado",
  RECUSADO = "Recusado",
}

interface SantinEmployeeDTO {
  id: number;
  nome: string;
  sobrenome: string;
  nomeCompleto: string;
  matricula: string;
  filialId: number;
  status: boolean;
  cpf: string;
  projetoId: number;
  dtAdmissao: string;
  dtCriacao: string;
  dtAtualizacao: string | null;
}

interface SantinUserDTO {
  id: number;
  nome: string;
  email: string;
  emailPessoal: string | null;
  senha: string;
  cpf: string | null;
  aprovador: boolean | null;
  autopreenchimentoChecklist: boolean | null;
  permissaoBloquearFicha: boolean | null;
  dtCriacao: Date | null;
  dtAtualizacao: Date | null;
  st: boolean;
  admin: boolean;
  departamentoId: number | null;
  usuarioId: number | null;
  autorizadorSaidVeic: boolean | null;
  permissaoCriarFichaDemitidos: boolean | null;
  permissaoStatusCipa: boolean | null;
  altSenha: boolean;
  mfa: boolean | null;
  alterarAnexosValidados: boolean | null;
  permissaoTotalProjeto: boolean | null;
}

type SantinContractDTO = z.infer<typeof upsertSantinContractSchema>;

type CreateSantinEmployeeDTO = z.infer<typeof createSantinEmployeeSchema>;
type UpdateSantinEmployeeDTO = z.infer<typeof updateSantinEmployeeSchema>;
interface SantinContractTypeDTO {
  id: number;
  dcTipoContrato: string;
  identificadorId: number;
  st: boolean;
  dtCriacao: Date | string;
  dtAtualizacao: Date | string | null;
  tipoContrato: Pick<SantinContractTypeDTO, "id" | "dcTipoContrato"> | null;
}

interface SantinDeviceDTO {
  id: number;
  nome: string;
  serialDispositivo: string;
  cdVerificacao: string;
  st: boolean;
  usuarioId: number;
  dtCriacao: Date | string;
  dtAtualizacao: Date | string | null;
}

interface SantinPartnerDTO {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  logradouro: string;
  endereco: string;
  nr: string;
  complemento: string;
  bairro: string;
  cep: string;
  municipioId: number;
  ufId: number;
  pessoaContato: string;
  contatoPrincipal: string;
  st: boolean;
  usuarioId: number;
  dtCriacao: Date | string;
  dtAtualizacao: Date | string | null;
  municipio?: SantinMunicipeDTO;
  uf?: SantinUfDTO;
}

interface SantinUfDTO {
  id: number;
  uf: string;
  dcUf: string;
  usuarioId: number;
  st: boolean;
}

interface SantinMunicipeDTO {
  id: number;
  cdMunicipio: string;
  dcMunicipio: string;
  st: boolean;
  ufId: number;
  usuarioId: number;
  latitude: number;
  longitude: number;
  dtCriacao: Date | string;
  dtAtualizacao: Date | string | null;
}

type SantinMealValueDTO = z.infer<typeof upsertSantinMealValueSchema>;

interface SantinProjectDTO {
  id: number;
  cdProjeto: string;
  dcProjeto: string;
  dtInicioProjeto: Date | string | null;
  dtFimProjeto: Date | string | null;
  st: boolean;
  usuarioId: number;
  centroCustoId: number | null;
  empresaId: number;
  dtCriacao: Date | string;
  dtAtualizacao: Date | string | null;
}

interface SantinContractTypeIdentifierDTO {
  id: number;
  dcIdentificador: string;
  st: boolean;
  usuarioId: number;
  dtCriacao: Date | string;
  dtAtualizacao: Date | string | null;
}

interface SantinMealEmployeeDTO {
  id: number;
  nome: string;
  matricula: string;
  empresa: string; //cnpj
  status: boolean;
  cpf: string;
  projeto: string;
  dtAdmissao: string;
  dtCriacao: string;
  dtAtualizacao: string | null;
}

interface SantinBranchDTO {
  id: number;
  cnpj: string;
  empresaId: number;
  municipioId: number;
  st: boolean;
  razaoSocial: string;
  dtCriacao: string;
  dtAtualizacao: string | null;
  usuarioId: number;
  humanusId: number;
  humanusCodEmpresa: string;
}

export type {
  CreateMealInput,
  CreateSantinEmployeeDTO,
  SantinBranchDTO,
  SantinContractDTO,
  SantinContractTypeDTO,
  SantinContractTypeIdentifierDTO,
  SantinDeviceDTO,
  SantinEmployeeDTO,
  SantinLoginErrorResponse,
  SantinLoginInput,
  SantinLoginResponse,
  SantinMealDTO,
  SantinMealEmployeeDTO,
  SantinMealValueDTO,
  SantinMunicipeDTO,
  SantinPartnerDTO,
  SantinProjectDTO,
  SantinUfDTO,
  SantinUserDTO,
  UpdateSantinEmployeeDTO,
};
