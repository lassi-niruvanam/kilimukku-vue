import type { App } from "vue";

import { type Constellation, créerConstellation } from "@constl/ipa";

export default ({ விண்மீன் }: { விண்மீன்?: Constellation }) => {
  return {
    install: (செயலி: App) => {
      const வாடிக்கையாளர் = விண்மீன் || créerConstellation();
      செயலி.config.globalProperties.$constl = வாடிக்கையாளர்;
      செயலி.provide("constl", வாடிக்கையாளர்);
    },
  };
};
