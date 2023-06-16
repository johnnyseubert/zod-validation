import { z } from 'zod';
import { capitalize } from '../helper/capitalize';

export const createUserFormSchema = z.object({
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   avatar: z.instanceof(FileList).transform((list) => list.item(0)!),
   name: z
      .string()
      .nonempty('O nome é obrigatório')
      .transform((text) => capitalize(text)),
   email: z
      .string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato de email inválido')
      .toLowerCase()
      .refine((value) => {
         return value.endsWith('@pulsati.com');
      }, 'o email deve terminar com @pulsati.com')
      .refine((value) => {
         return value.startsWith('johnny');
      }, 'o email deve comecar com johnny'),
   password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
   techs: z
      .array(
         z.object({
            title: z.string(),
            knowlegde: z.coerce
               .number()
               .min(1, 'O conhecimento deve ser entre 1 e 100')
               .max(100, 'O conhecimento deve ser entre 1 e 100'),
         })
      )
      .min(2, 'A lista Deve ter no minimo 2 tecnologias')
      .refine((array) => {
         return array.every((item) => {
            return item.title.includes('1');
         });
      }, 'Todos os itens devem ter 1'),
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
