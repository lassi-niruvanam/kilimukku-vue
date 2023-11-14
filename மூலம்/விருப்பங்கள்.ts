import Cookies from "js-cookie";

import { App, Ref, inject, ref, watchEffect } from "vue";

export const விருப்பங்களை_பயன்படுத்து = () => {
  const { விரும்பின_மொழிகள், தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு } = inject<{
    விரும்பின_மொழிகள்: Ref<string[]>;
    தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு: Ref<string>;
  }>("விருப்பங்கள்");

  watchEffect(() => {
    Cookies.set("paramètres.langue", JSON.stringify(விரும்பின_மொழிகள்.value));
  });
  watchEffect(() => {
    Cookies.set("paramètres.numération", தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு.value);
  });

  return {
    விரும்பின_மொழிகள்,
    தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு,
  };
};

export const விருப்பங்களை_உருவாக்கு = ({
  மொழி,
  மாற்றுமொழிகள் = [],
}: {
  மொழி: string;
  மாற்றுமொழிகள்?: string[];
}) => {
  return {
    install: (செயலி: App) => {
      const témoin = Cookies.get("paramètres.langue");
      let சேமிக்கப்பட்டவை: string[] | undefined = undefined;
      try {
        சேமிக்கப்பட்டவை = témoin ? JSON.parse(témoin) : undefined;
      } catch {
        // பரவயில்லை :)
      }
      const விரும்பின_மொழிகள் = ref<string[]>(
        Array.isArray(சேமிக்கப்பட்டவை)
          ? சேமிக்கப்பட்டவை
          : [மொழி, ...மாற்றுமொழிகள்],
      );

      const témoin_num = Cookies.get("paramètres.numération");
      const தேர்நதெடுத்தப்பட்ட_எண்ணுரு = ref<string>(témoin_num || undefined);

      செயலி.provide("விருப்பங்கள்", {
        விரும்பின_மொழிகள்,
        தேர்நதெடுத்தப்பட்ட_எண்ணுரு,
      });
    },
  };
};
