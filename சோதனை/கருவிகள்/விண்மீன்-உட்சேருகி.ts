import type { App } from "vue";

import { ClientConstellation, générerClient, mandataire } from "@constl/ipa";

export default ({ விண்மீன் }: { விண்மீன்?: ClientConstellation }) => {
  return {
    install: (செயலி: App) => {
      const வாடிக்கையாளர் = விண்மீன் || générerClient({});
      செயலி.config.globalProperties.$constl = வாடிக்கையாளர்;
      செயலி.provide("constl", வாடிக்கையாளர்);
    },
  };
};
