import type { App } from "vue";
import { கிளிமூக்கை_உருவாக்கு } from "./கிளிமூக்கு";
import {
  கிளிமூக்கு,
  மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி,
  மரம்_மொழிபெயர்ப்பு_அகராதி_வகை,
} from "@lassi-js/kilimukku";

export {version as பதிப்பு} from "@/பதிப்பு.js";

export * from "@/எண்கள்.js";
export * from "@/கருவிகள்.js";
export * from "@/மொழிகள்.js";
export * from "@/விருப்பங்கள்.js"
export * from "@/கிளிமூக்கு.js"

export default ({
  மொழி,
  மாற்றுமொழிகள் = [],
  மூல்_மொழி,
  மூல்_மொழிபெயர்ப்புகள்,
  அடையாளம்,
  நினைவிகள்
  
}: {
  மொழி: string;
  மாற்றுமொழிகள்?: string[];
  மூல்_மொழி: string;
  மூல்_மொழிபெயர்ப்புகள்: மரம்_மொழிபெயர்ப்பு_அகராதி_வகை;
  அடையாளம்?: string;
  நினைவிகள்?: {
    மொழி?: string;
    எண்ணுரு?: string;
  };
}) => {
  return {
    install: (செயலி: App) => {
      const விண்மீன் = செயலி.config.globalProperties.$constl;
      if (அடையாளம் && !விண்மீன்) throw Error("விண்மீன் கிடைக்கதில்லை.");

      const கிளி = new கிளிமூக்கு({
        விண்மீன்,
        மூல்_மொழி,
        மூல்_மொழிபெயர்ப்புகள்: மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி(
          மூல்_மொழிபெயர்ப்புகள்,
        ),
        அடையாளம்,
      });

      const கிளிமூக்கு_ = கிளிமூக்கை_உருவாக்கு({
        மொழி,
        மாற்றுமொழிகள்,
        கிளி,
        நினைவிகள்
      });

      செயலி.use(கிளிமூக்கு_);
    },
  };
};
