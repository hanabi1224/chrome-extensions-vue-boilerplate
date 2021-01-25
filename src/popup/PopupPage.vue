<template>
  <div class="popup-page">
    <p>Current tab ID: {{ pageId }}</p>
    <p>Current tab URL: {{ pageUrl }}</p>
    <p>
        <input type="button" value="count+1" @click="countAdd(1)"></input>
        <input type="button" value="count-1" @click="countAdd(-1)"></input>
        <input type="button" value="Alert current tab id" @click="alertCurrentTab"></input>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const currentActivePageQueryInfo = {
  active: true,
  currentWindow: true,
};

@Component({
  components: {},
})
export default class PopupPage extends Vue {
  count = 0;
  currentTab: chrome.tabs.Tab;
  pageId = 0;
  pageUrl = "";

  countAdd(n: number) {
    this.count += n;
    chrome.browserAction.setBadgeText({ text: `${this.count}` });
  }

  alertCurrentTab() {
    chrome.tabs.sendMessage(
      this.currentTab.id,
      {
        tab: this.currentTab,
      },
      function (msg) {
        console.log("Response message:", msg);
      }
    );
  }

  mounted() {
    var self = this;

    // Init badge text
    this.countAdd(0);

    chrome.tabs.query(currentActivePageQueryInfo, function (tabs) {
      self.currentTab = tabs[0];
      self.pageId = self.currentTab.id;
      self.pageUrl = self.currentTab.url;
    });
  }
}
</script>

<style lang="scss" scoped>
.popup-page {
  width: 400px;
}
</style>
