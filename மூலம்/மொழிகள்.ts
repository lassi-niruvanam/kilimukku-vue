import { type ComputedRef, type Ref, computed, inject, App } from "vue";
import { குறிப்பின்_மதிப்பை_பெறு, குறிப்பு_அல்லது_மதிப்பு } from "./கருவிகள்";
import { Nuchabäl } from "nuchabal";
import {
  விருப்பங்களை_உருவாக்கு,
  விருப்பங்களை_பயன்படுத்து,
} from "./விருப்பங்கள்.js";

export const nuchabäl_கண்டுப்பிடி = () => {
  const nuchabäl = inject<Nuchabäl>("nuch'ab'äl");
  if (!nuchabäl) throw new Error("Nuch'ab'äl கிடைத்ததில்லை.");
  return nuchabäl;
};

export const மொழிகளைப்_பயன்படுத்து = () => {
  const nuchabäl = nuchabäl_கண்டுப்பிடி();

  const { விரும்பின_மொழிகள் } = விருப்பங்களை_பயன்படுத்து();
  const மொழி = computed(() => விரும்பின_மொழிகள்.value[0]);
  const மாற்றுமொழிகள் = computed(() => விரும்பின_மொழிகள்.value.slice(1));

  const மொழிகளை_தேர்ந்தெடுக்கொள்ளு = (மொழிகள்: string | string[]) => {
    if (Array.isArray(மொழிகள்)) {
      if (மொழிகள்.length) {
        விரும்பின_மொழிகள்.value = மொழிகள்;
      }
    } else {
      விரும்பின_மொழிகள்.value = [
        மொழிகள்,
        ...விரும்பின_மொழிகள்.value.filter((மொ) => மொ !== மொழிகள்),
      ];
    }
  };

  const அகராதியிலிருந்து_மொழிபெயர்ப்பு = (
    அகராதி: Ref<{ [மொ: string]: string }>,
  ): ComputedRef<string | undefined> => {
    return computed(() => {
      for (const மொ of விரும்பின_மொழிகள்.value) {
        if (அகராதி.value[மொ]) return அகராதி.value[மொ];
      }
      const பிடித்த_எழுத்து = nuchabäl?.rutzibanemChabäl({
        runuk: விரும்பின_மொழிகள்.value[0],
      });
      for (const மொ of விரும்பின_மொழிகள்.value) {
        if (
          பிடித்த_எழுத்து &&
          பிடித்த_எழுத்து === nuchabäl?.rutzibanemChabäl({ runuk: மொ })
        )
          return அகராதி.value[மொ];
      }
      return Object.values(அகராதி.value)[0];
    });
  };

  const வலதிலிருந்து_இடது_மொழி = (
    மொழி_?: குறிப்பு_அல்லது_மதிப்பு<string>,
  ): ComputedRef<boolean> => {
    return computed(() => {
      const எழுத்து = nuchabäl?.rutzibanemChabäl({
        runuk: குறிப்பின்_மதிப்பை_பெறு(மொழி_) || மொழி.value,
      });
      if (!எழுத்து) return false;
      const திசை = nuchabäl?.rucholanemTzibanem({ runuk: எழுத்து });
      return திசை ? திசை === "←↓" : false;
    });
  };

  return {
    மொழி,
    மாற்றுமொழிகள்,
    மொழிகளை_தேர்ந்தெடுக்கொள்ளு,
    அகராதியிலிருந்து_மொழிபெயர்ப்பு,
    வலதிலிருந்து_இடது_மொழி,
  };
};

export const மொழிகளை_உருவாக்கு = ({
  மொழி,
  மாற்றுமொழிகள் = [],
  நினைவிகள்,
}: {
  மொழி: string;
  மாற்றுமொழிகள்?: string[];
  நினைவிகள்?: {
    மொழி?: string;
    எண்ணுரு?: string;
  };
}) => {
  return {
    install: (செயலி: App) => {
      const விண்மீன் = செயலி.config.globalProperties.$constl;
      செயலி.use(விருப்பங்களை_உருவாக்கு({ மொழி, மாற்றுமொழிகள், நினைவிகள் }));

      const nuchabäl = new Nuchabäl({ chumil: விண்மீன் });
      செயலி.provide("nuch'ab'äl", { nuchabäl });
      செயலி.config.globalProperties.$nuchabäl = nuchabäl;
    },
  };
};
