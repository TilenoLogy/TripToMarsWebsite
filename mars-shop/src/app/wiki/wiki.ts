import { Component } from '@angular/core';
import wikiData from './wiki-data.json';

@Component({
  imports: [],
  selector: 'app-wiki',
  styleUrl: './wiki.css',
  templateUrl: './wiki.html',
})
export class Wiki {
  selectedTab = 'basics';

  tabs = wikiData;

  get selectedCards() {
    return this.tabs.find(tab => tab.id === this.selectedTab)?.cards ?? [];
  }

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }
}
