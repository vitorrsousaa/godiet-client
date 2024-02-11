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

import { Header } from './components/Header';
import { Section } from './components/Section';

export function Settings() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex flex-col gap-4">
        <Header title={'Informações pessoais'} extra={<Button>Salvar</Button>}>
          Gerencie e atualize suas informações pessoais aqui, como nome, foto e
          outras informações.
        </Header>
        <Separator />
        <Section
          title="Foto"
          description="Atualize a sua foto de perfil e escolha onde deseja exibi-la."
        >
          <Avatar
            name="jonas"
            className="h-16 w-16"
            src="https://github.com/shadcn.png"
          />
        </Section>

        <Separator className="my-6" />
        <Section
          title="Aparência"
          description="Personalize a aparência da sua aplicação."
          className="w-72  sm:w-40"
        >
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
        </Section>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <Header title={'Área crítica'}>
          Aqui você pode atualizar sua senha, configurar autenticação de dois
          fatores ou excluir sua conta. Por favor, esteja ciente das ações que
          você está realizando.
        </Header>

        <Separator />
        <Section
          title="Senha"
          description="Recupere ou atualize sua senha, se necessário."
          className="w-72 sm:mb-6 md:mb-0 md:w-40 lg:w-72"
          classContainer="sm:flex-col md:flex-row "
        >
          <div className="space-y-4 text-right sm:min-w-72">
            <Input name="password" placeholder="Senha atual" />
            <Input name="new-password" placeholder="Nova senha" />
            <Button className="">Atualizar senha</Button>
          </div>
        </Section>

        <Separator className="my-6" />
        <Section
          danger
          title="Excluir minha conta"
          description="Esta ação é irreversível. Ao deletar sua conta, todos os seus dados serão permanentemente removidos."
          className="w-96 sm:w-40 md:w-72 lg:w-full"
        >
          <div>
            <Button variant={'destructive'}>
              <TrashIcon className="mr-1 h-4 w-4" />
              Deletar minha conta
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
