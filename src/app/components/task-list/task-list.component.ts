import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../toast/toast.service';
import { TaskService } from '../../services/task.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tarefas: any[] = [];
  novaTarefa = { titulo: '', descricao: '', status: 'Pendente' };
  editarModo = false;
  tarefaEditandoId: string | null = null;
  filtroStatus: string = '';

  constructor(private http: HttpClient, private toastService: ToastService, private taskService: TaskService ) { }

  ngOnInit(): void {
    this.buscarTodas();
  }

  buscarTodas() {
    this.http.get<any>('http://localhost:5235/api/Tasks/all')
      .subscribe(res => this.tarefas = res.data);
  }

  buscarPorStatus() {
    if (!this.filtroStatus) return this.buscarTodas();

    this.http.get<any>(`http://localhost:5235/api/tasks?status=${this.filtroStatus}`)
      .subscribe(res => this.tarefas = res.data);
  }

  adicionarTarefa() {

    const { titulo, descricao } = this.novaTarefa;

    if (!titulo.trim() || !descricao.trim()) {
      this.toastService.show('Preencha o título e a descrição antes de adicionar.', 'warning');
      return;
    }
    this.http.post<any>('http://localhost:5235/api/tasks', this.novaTarefa)
      .subscribe(() => {
        this.novaTarefa = { titulo: '', descricao: '', status: 'Pendente' };
        this.buscarTodas();
        this.toastService.show('Tarefa adicionada com sucesso!','success');
      });
  }

  iniciarEdicao(tarefa: any) {
    this.editarModo = true;
    this.tarefaEditandoId = tarefa.id;
    this.novaTarefa = { ...tarefa };
  }

  cancelarEdicao() {
    this.editarModo = false;
    this.tarefaEditandoId = null;
    this.novaTarefa = { titulo: '', descricao: '', status: 'Pendente' };
  }

  salvarEdicao() {
    if (!this.tarefaEditandoId) return;
    const { titulo, descricao } = this.novaTarefa;
    if (!titulo.trim() || !descricao.trim()) {
      this.toastService.show('Preencha o título e a descrição antes de adicionar.', 'warning');
      return;
    }

    this.http.put<any>(`http://localhost:5235/api/tasks/${this.tarefaEditandoId}`, this.novaTarefa)
      .subscribe(() => {
        this.cancelarEdicao();
        this.buscarTodas();
        this.toastService.show('Tarefa atualizada com sucesso!', 'success');
      });
  }

  deletarTarefa(id: string) {
    this.http.delete<any>(`http://localhost:5235/api/tasks/${id}`)
      .subscribe(() => {
        this.buscarTodas();
        this.toastService.show('Tarefa excluída.','success');
      });
  }

  concluirTarefa(tarefa: any) {
    const atualizacao = {
      ...tarefa,
      status: 'Concluida'
    };

    this.http.put<any>(`http://localhost:5235/api/tasks/${tarefa.id}`, atualizacao)
      .subscribe(() => {
        this.buscarTodas();
        this.toastService.show('Tarefa concluída!', 'success');
      });
  }

  exportarParaExcel() {
    this.http.get('http://localhost:5235/api/Tasks/exportar-excel', {
      responseType: 'blob'
    }).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
      saveAs(blob, 'tarefas.xlsx');
    }, error => {
      this.toastService.show('Erro ao exportar tarefas. Tente novamente.', 'error');
    });
  
  }
  
}
