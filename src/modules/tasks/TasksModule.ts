import SystemSculptPlugin from '../../main';
import { BrainModule } from '../brain/BrainModule';
import {
  SystemSculptTasksSettings,
  DEFAULT_TASKS_SETTINGS,
} from './settings/TasksSettings';
import { SystemSculptTasksSettingTab } from './settings/TasksSettingTab';
import { viewTasks } from './functions/viewTasks';
import { TaskModal } from './views/TaskModal';
import { generateTask as generateTaskFunction } from './functions/generateTask';
import { insertGeneratedTask as insertGeneratedTaskFunction } from './functions/insertGeneratedTask';

export interface Task {
  description: string;
  subtasks: { description: string; completed: boolean }[];
  completed: boolean;
}

export class TasksModule {
  plugin: SystemSculptPlugin;
  brain: BrainModule;
  settings: SystemSculptTasksSettings;

  constructor(plugin: SystemSculptPlugin, brain: BrainModule) {
    this.plugin = plugin;
    this.brain = brain;
  }

  async load() {
    await this.loadSettings();

    this.plugin.addCommand({
      id: 'open-task-modal',
      name: 'Add Task',
      callback: async () => {
        new TaskModal(this.plugin.app, this).open();
      },
    });

    this.plugin.addCommand({
      id: 'view-tasks',
      name: 'View Tasks',
      callback: () => {
        this.viewTasks();
      },
    });
  }

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_TASKS_SETTINGS,
      await this.plugin.loadData()
    );
  }

  async saveSettings() {
    await this.plugin.saveData(this.settings);
  }

  settingsDisplay(containerEl: HTMLElement): void {
    new SystemSculptTasksSettingTab(
      this.plugin.app,
      this,
      containerEl
    ).display();
  }

  async viewTasks(): Promise<void> {
    return viewTasks(this);
  }

  async generateTask(taskDescription: string): Promise<string> {
    return generateTaskFunction(this, taskDescription);
  }

  async insertGeneratedTask(generatedTask: string): Promise<void> {
    return insertGeneratedTaskFunction(this, generatedTask);
  }
}
