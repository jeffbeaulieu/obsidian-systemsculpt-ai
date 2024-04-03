import { App, PluginSettingTab } from 'obsidian';
import SystemSculptPlugin from './main';
import { renderBrainAnimation } from './modules/brain/views/BrainAnimation';

export interface SystemSculptSettings {
  openAIApiKey: string;
}

export const DEFAULT_SETTINGS: SystemSculptSettings = {
  openAIApiKey: '',
};

export class SystemSculptSettingTab extends PluginSettingTab {
  plugin: SystemSculptPlugin;

  constructor(app: App, plugin: SystemSculptPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    const animationContainer = this.renderAnimationContainer();
    renderBrainAnimation(animationContainer);

    const linksContainer = this.renderLinksContainer();

    const tabContainer = this.renderTabContainer();
    const settingsContainer = this.renderSettingsContainer();

    this.showTab('brain');
  }

  private renderAnimationContainer(): HTMLElement {
    return this.containerEl.createDiv('animation-container');
  }

  private renderTabContainer(): HTMLElement {
    const tabContainer = this.containerEl.createDiv('tab-container');

    this.renderTab(tabContainer, 'brain', 'Brain');
    this.renderTab(tabContainer, 'tasks', 'Tasks');
    this.renderTab(tabContainer, 'recorder', 'Recorder');
    this.renderTab(tabContainer, 'templates', 'Templates');
    this.renderTab(tabContainer, 'data', 'Data');
    this.renderTab(tabContainer, 'about', 'About');

    return tabContainer;
  }

  private renderTab(
    tabContainer: HTMLElement,
    tabId: string,
    tabLabel: string
  ): void {
    const tab = tabContainer.createDiv('tab');
    tab.dataset.tabId = tabId;
    tab.createSpan({ text: tabLabel });
    tab.addEventListener('click', () => this.showTab(tabId));
  }

  private renderLinksContainer(): HTMLElement {
    const linksContainer = this.containerEl.createDiv('links-container');

    const links = [
      { text: 'SystemSculpt.com', url: 'https://systemsculpt.com' },
      {
        text: 'Buy Me a Coffee',
        url: 'https://www.buymeacoffee.com/SystemSculpt',
      },

      {
        text: 'Patreon',
        url: 'https://www.patreon.com/SystemSculpt',
      },
      {
        text: 'X/Twitter',
        url: 'https://www.twitter.com/SystemSculpt',
      },
    ];

    links.forEach(link => {
      const linkEl = linksContainer.createEl('a', {
        text: link.text,
        href: link.url,
        cls: 'settings-link',
      });
      linkEl.setAttr('target', '_blank');
      linkEl.setAttr('rel', 'noopener noreferrer');
    });

    return linksContainer;
  }

  private renderSettingsContainer(): HTMLElement {
    return this.containerEl.createDiv('settings-container');
  }

  showTab(tabId: string): void {
    const tabContainer = this.containerEl.querySelector('.tab-container');
    const tabs = tabContainer.childNodes;
    const settingsContainer = this.containerEl.querySelector(
      '.settings-container'
    );

    this.setActiveTab(tabs, tabId);
    settingsContainer.empty();

    switch (tabId) {
      case 'brain':
        this.plugin.brainModule.settingsDisplay(
          settingsContainer as HTMLElement
        );
        break;
      case 'tasks':
        this.plugin.tasksModule.settingsDisplay(
          settingsContainer as HTMLElement
        );
        break;
      case 'templates':
        this.plugin.templatesModule.settingsDisplay(
          settingsContainer as HTMLElement
        );
        break;
      case 'recorder':
        this.plugin.recorderModule.settingsDisplay(
          settingsContainer as HTMLElement
        );
        break;
      case 'data':
        this.plugin.dataModule.settingsDisplay(
          settingsContainer as HTMLElement
        );
        break;
      case 'about':
        this.plugin.aboutModule.settingsDisplay(
          settingsContainer as HTMLElement
        );
        break;
    }
  }

  private setActiveTab(tabs: NodeListOf<ChildNode>, activeTabId: string): void {
    tabs.forEach((tab: HTMLElement) => {
      if (tab.dataset.tabId === activeTabId) {
        tab.addClass('active');
      } else {
        tab.removeClass('active');
      }
    });
  }
}
