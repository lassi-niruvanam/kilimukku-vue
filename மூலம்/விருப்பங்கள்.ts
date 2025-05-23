import { App, Ref, inject, ref, watchEffect } from "vue";
import { எண்ணுரு_நினைவி_பெயர், மொழி_நினைவி_பெயர் } from "./மாறிலிகள்.js";

export const விருப்பங்களை_பயன்படுத்து = () => {
  const {
    தேர்ந்தெடுத்தப்பட்ட_மொழிகள்,
    தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு,
    நினைவிகள்,
  } = inject<{
    தேர்ந்தெடுத்தப்பட்ட_மொழிகள்: Ref<string[]>;
    தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு: Ref<string|undefined>;
    நினைவிகள்?: {
      மொழி?: string;
      எண்ணுரு?: string;
    };
  }>("விருப்பங்கள்")!;

  watchEffect(() => {
    localStorage.setItem(
      நினைவிகள்?.மொழி || மொழி_நினைவி_பெயர்,
      JSON.stringify(தேர்ந்தெடுத்தப்பட்ட_மொழிகள்.value),
    );
  });
  watchEffect(() => {
    if (தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு.value)
      localStorage.setItem(
        நினைவிகள்?.எண்ணுரு || எண்ணுரு_நினைவி_பெயர்,
        தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு.value,
      );
    else localStorage.removeItem(நினைவிகள்?.எண்ணுரு || எண்ணுரு_நினைவி_பெயர்);
  });

  return {
    தேர்ந்தெடுத்தப்பட்ட_மொழிகள்,
    தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு,
  };
};

export const விருப்பங்களை_உருவாக்கு = ({
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
      const மொழி_நினைவி = localStorage.getItem(
        நினைவிகள்?.மொழி || மொழி_நினைவி_பெயர்,
      );
      let சேமிக்கப்பட்டவை: string[] | undefined = undefined;
      try {
        சேமிக்கப்பட்டவை = மொழி_நினைவி ? JSON.parse(மொழி_நினைவி) : undefined;
      } catch {
        // பரவயில்லை :)
      }
      const தேர்ந்தெடுத்தப்பட்ட_மொழிகள் = ref<string[]>(
        Array.isArray(சேமிக்கப்பட்டவை)
          ? சேமிக்கப்பட்டவை
          : [மொழி, ...மாற்றுமொழிகள்],
      );

      const எண்ணுரு_நினைவி = localStorage.getItem(
        நினைவிகள்?.எண்ணுரு || எண்ணுரு_நினைவி_பெயர்,
      );
      const தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = ref(எண்ணுரு_நினைவி || undefined);

      செயலி.provide("விருப்பங்கள்", {
        நினைவிகள்,
        தேர்ந்தெடுத்தப்பட்ட_மொழிகள்,
        தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு,
      });
    },
  };
};
