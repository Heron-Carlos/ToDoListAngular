import { provideHttpClient } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';

export const appConfig = {
  providers: [provideHttpClient()],
  standaloneComponents: [TaskListComponent]
};
