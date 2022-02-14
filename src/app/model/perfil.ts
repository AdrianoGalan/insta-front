import { Email } from './email';
import { Status } from './status';

export class Perfil {
  id!: string;
  username!: string;
  nome!: string;
  sobreNome!: string;
  dispositivo!: string;
  dataCriacao!: Date;
  dataCadastro!: Date;
  dataBloqueio!: Date;
  dataInicioTrabalho!: Date;
  numeroSeguidor!: string;
  numeroSeguindo!: string;
  genero!: string;
  email!: Email;
  status!: Status;
}
