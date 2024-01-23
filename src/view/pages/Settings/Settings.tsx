import { Avatar } from '@godiet-components/Avatar';
import { Button } from '@godiet-components/Button';
import { Input } from '@godiet-components/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@godiet-components/Select';
import { Separator } from '@godiet-components/Separator';
import { Theme } from '@godiet-contexts/theme';
import { useTheme } from '@godiet-hooks/theme';

import { TrashIcon } from '@radix-ui/react-icons';

export function Settings() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <header className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="flex flex-col">
            <h1 className="text-lg font-medium">Informações pessoais</h1>
            <small className="hidden font-medium text-gray-500 sm:block">
              Gerencie e atualize suas informações pessoais aqui, como nome,
              foto e outras informações.
            </small>
          </div>
          <Button>Salvar</Button>
        </header>
        <Separator />
        <div className="flex w-full flex-col justify-between sm:flex-row">
          <div className="mb-6 sm:mb-0 sm:w-72">
            <h2 className=" text-sm font-medium">Foto</h2>
            <small className="font-medium text-gray-500">
              Atualize a sua foto de perfil e escolha onde deseja exibi-la.
            </small>
          </div>
          <Avatar
            name="jonas"
            className="h-16 w-16"
            src="https://github.com/shadcn.png"
          />
        </div>
        <Separator className="my-6" />
        <div className="flex w-full flex-col justify-between sm:flex-row">
          <div className="mb-6 w-40 sm:mb-0 sm:w-72">
            <h2 className=" text-sm font-medium">Aparência</h2>
            <small className="font-medium text-gray-500">
              Personalize a aparência da sua aplicação.
            </small>
          </div>
          <div>
            <Select onValueChange={(event) => setTheme(event as Theme)}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Selecione o tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex w-full flex-col justify-between sm:flex-row ">
          <div className="mb-6 sm:mb-0 sm:w-72">
            <h2 className=" text-sm font-medium">Nome</h2>
            <small className="font-medium text-gray-500">
              Insira seu nome completo
            </small>
          </div>
          <div>
            <Input name="name" placeholder="Nome" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <header className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="flex flex-col">
            <h1 className="text-lg font-medium">Área crítica</h1>
            <small className="hidden font-medium text-gray-500 sm:block">
              Aqui você pode atualizar sua senha, configurar autenticação de
              dois fatores ou excluir sua conta. Por favor, esteja ciente das
              ações que você está realizando.
            </small>
          </div>
        </header>
        <Separator />
        <div className="flex w-full flex-col justify-between sm:flex-row ">
          <div className="mb-6 sm:mb-0 sm:w-72">
            <h2 className=" text-sm font-medium">Senha</h2>
            <small className="font-medium text-gray-500">
              Recupere ou atualize sua senha, se necessário.
            </small>
          </div>
          <div className="space-y-4 text-right sm:min-w-72">
            <Input name="password" placeholder="Senha atual" />
            <Input name="new-password" placeholder="Nova senha" />
            <Button className="">Atualizar senha</Button>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex w-full flex-col justify-between sm:flex-row ">
          <div className="mb-6 sm:mb-0 sm:w-72">
            <h2 className=" text-sm font-medium text-red-600">
              Excluir minha conta
            </h2>
            <small className="font-medium text-gray-500">
              Esta ação é irreversível. Ao deletar sua conta, todos os seus
              dados serão permanentemente removidos.
            </small>
          </div>
          <div>
            <Button variant={'destructive'}>
              <TrashIcon className="mr-1 h-4 w-4" />
              Deletar minha conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
