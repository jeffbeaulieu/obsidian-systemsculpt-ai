import { Setting } from 'obsidian';
import { TasksModule } from '../TasksModule';
import { DEFAULT_TASKS_SETTINGS } from './TasksSettings';

export function renderTasksLocationSetting(
  containerEl: HTMLElement,
  plugin: TasksModule
): void {
  new Setting(containerEl)
    .setName('Tasks Location')
    .setDesc('The file path where tasks will be stored')
    .addText(text => {
      text
        .setPlaceholder('Enter tasks location')
        .setValue(plugin.settings.tasksLocation)
        .onChange(async (newValue: string) => {
          plugin.settings.tasksLocation = newValue;
          await plugin.saveSettings();
        });
    })
    .addExtraButton(button => {
      button
        .setIcon('reset')
        .setTooltip('Reset to default tasks location')
        .onClick(async () => {
          plugin.settings.tasksLocation = DEFAULT_TASKS_SETTINGS.tasksLocation;
          await plugin.saveSettings();
          plugin.settingsDisplay(containerEl);
        });
    });
}
