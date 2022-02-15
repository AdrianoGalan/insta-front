import { Email } from './email';
import { Status } from './status';

export class Perfil {
  id!: string;
  username!: string;
  senha!: string;
  nome!: string;
  sobreNome!: string;
  dispositivo!: string;
  dataCriacao!: string;
  dataCadastro!: Date;
  dataBloqueio!: Date;
  dataInicioTrabalho!: Date;
  numeroSeguidor!: string;
  numeroSeguindo!: string;
  genero!: string;
  email!: Email;
  status!: Status;
}
