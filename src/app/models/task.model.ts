export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  dataCriacao: string;
  dataConclusao: string | null;
}
