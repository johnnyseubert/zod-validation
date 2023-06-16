import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   CreateUserFormData,
   createUserFormSchema,
} from './schemas/createUserFormSchema';
import { supabase } from './lib/supabase';

export default function App() {
   const [output, setOutput] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<CreateUserFormData>({
      resolver: zodResolver(createUserFormSchema),
   });

   const { fields, append, remove } = useFieldArray({
      name: 'techs',
      control: control,
   });

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const submitForm = async (data: CreateUserFormData) => {
      setIsLoading(true);
      try {
         await supabase.storage
            .from('forms-react')
            .upload(data.avatar.name, data.avatar);
         setOutput(JSON.stringify(data, null, 2));
         setIsLoading(false);
      } catch (error) {
         setIsLoading(false);
      }
   };

   return (
      <main className="min-h-screen w-full bg-zinc-950 text-zinc-300 flex flex-col gap-5 items-center justify-center">
         <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-4 w-full max-w-[300px]"
         >
            <div className="flex flex-col gap-1">
               <label htmlFor="">Avatar</label>
               <input {...register('avatar')} type="file" accept="image/*" />
               {errors.avatar && <span>{errors.avatar.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="">Nome</label>
               <input
                  {...register('name')}
                  type="text"
                  className="text-black px-2 py-1 text-sm border border-zinc-300 rounded-sm shadow-sm"
               />
               {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="">E-mail</label>
               <input
                  {...register('email')}
                  type="email"
                  className="text-black px-2 py-1 text-sm border border-zinc-300 rounded-sm shadow-sm"
               />
               {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="">Senha</label>
               <input
                  {...register('password')}
                  type="password"
                  className="text-black px-2 py-1 text-sm border border-zinc-300 rounded-sm shadow-sm"
               />
               {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="">
                  Técnologias
                  <button
                     onClick={() => append({ title: '', knowlegde: 1 })}
                     type="button"
                     className="px-2 py-1 bg-emerald-500 text-black rounded-sm ml-5"
                  >
                     Adicionar
                  </button>
                  <button
                     onClick={() => remove(fields.length - 1)}
                     type="button"
                     className="px-2 py-1 bg-emerald-500 text-black rounded-sm ml-5"
                  >
                     Remover
                  </button>
               </label>

               {errors.techs && <span>{errors.techs.message}</span>}

               {fields.map((field, index) => {
                  return (
                     <div className="flex flex-col gap-4  my-5" key={field.id}>
                        <input
                           {...register(`techs.${index}.title`)}
                           className="text-black px-2 py-1 text-sm border border-zinc-300 rounded-sm shadow-sm"
                        />
                        {errors.techs?.[index]?.title && (
                           <span>{errors.techs?.[index]?.title?.message}</span>
                        )}
                        <input
                           {...register(`techs.${index}.knowlegde`)}
                           type="number"
                           className="text-black px-2 py-1 text-sm border border-zinc-300 rounded-sm shadow-sm"
                        />
                        {errors.techs?.[index]?.knowlegde && (
                           <span>
                              {errors.techs?.[index]?.knowlegde?.message}
                           </span>
                        )}
                     </div>
                  );
               })}
            </div>

            <button
               className="bg-emerald-400 text-white rounded-sm py-2 px-4 hover:bg-emerald-600 transition-colors"
               type="submit"
            >
               {isLoading && <span className="text-xl">Carregando</span>}
               {!isLoading && <span>Salvar</span>}
            </button>
            <pre>{output}</pre>
         </form>
      </main>
   );
}
