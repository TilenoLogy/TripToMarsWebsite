import { Component } from '@angular/core';
import devlogData from "./devlog-data.json"

@Component({
  imports: [],
  selector: 'app-devlog',
  styleUrl: './devlog.css',
  templateUrl: './devlog.html',
})
export class Devlog {
  selectedTab = 'posts';

  tabs = devlogData;

  get selectedCards() {
    return this.tabs.find(tab => tab.id === this.selectedTab)?.cards ?? [];
  }

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }
}
