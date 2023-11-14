import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";
import type { Ref, App } from "vue";
import { isEqual } from "lodash";
import {
  கிளிமூக்கு,
  மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி,
  மொழிபெயர்ப்பு_அகராதியிலிருந்து_மரம்,
} from "@lassi-js/kilimukku";
import type {
  பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை,
  மொழிபெயர்ப்பு_அகராதி_வகை,
  முன்னேற்றம்_தகவல்கள்,
  மரம்_மொழிபெயர்ப்பு_அகராதி_வகை,
} from "@lassi-js/kilimukku";

import { nuchabäl_கண்டுப்பிடி, மொழிகளைப்_பயன்படுத்து } from "./மொழிகள்.js";
import { எண்களை_உருவாக்கு, எண்களைப்_பயன்படுத்து } from "./எண்கள்.js";
import { schémaFonctionOublier } from "@constl/ipa/dist/src/types.js";

const கிளியை_கண்டுப்பிடி = () => {
  const கிளி = inject<கிளிமூக்கு>("கிளிமூக்கு");
  if (!கிளி) throw new Error("கிளிமூக்கு கிடைத்ததில்லை.");
  return கிளி;
};

const செய்திகளைப்_பயன்படுத்து = ({
  பரிந்துரைகள் = "எனது",
  கிளி,
}: {
  பரிந்துரைகள்: "எனது" | "எல்லாம்" | "வேண்டாம்";
  கிளி?: கிளிமூக்கு;
}) => {
  const கோரிக்கை_அடையாளம் = uuidv4();
  if (இருக்கும்) {
    onUnmounted(async () => {
      await மறந்துவிடு(கோரிக்கை_அடையாளம்);
    });
    return இருக்கும்;
  }
  const செய்திகள் = ref<மரம்_மொழிபெயர்ப்பு_அகராதி_வகை>({});
  let மறந்துவிடு: schémaFonctionOublier;
  onMounted(async () => {
    மறந்துவிடு = await கிளி.மொழிபெயர்ப்புகளை_கேள்ளு({
      செ: (மொழிபெயர்ப்புகள்) => {
        செய்திகள்.value = மொழிபெயர்ப்பு_அகராதியிலிருந்து_மரம்(மொழிபெயர்ப்புகள்);
      },
      பரிந்துரைகள்,
    });
  });
  onUnmounted(async () => {
    if (மறந்துவிடு) await மறந்துவிடு();
  });

  return { செய்திகள் };
};

const மொழியாக்கம்_பயன்படுத்து = ({
  பரிந்துரைகள் = "எனது",
  கிளி,
}: {
  பரிந்துரைகள்: "எனது" | "எல்லாம்" | "வேண்டாம்";
  கிளி?: கிளிமூக்கு;
}) => {
  const { மொழி, மாற்றுமொழிகள் } = மொழிகளைப்_பயன்படுத்து();
  const { எண்ணை_வடிவூட்டு } = எண்களைப்_பயன்படுத்து();

  const { செய்திகள் } = செய்திகளைப்_பயன்படுத்து({ கிளி, பரிந்துரைகள் });

  const { கிடைக்கும்_மொழி_குறியீடுகள்: கிளிமூக்கு_மொழிகள் } =
    கிடைக்கும்_மொழிகளை_பயன்படுத்து({ பரிந்துரைகள், கிளி });

  const மொ = (
    சாபி: string,
    interpol?: { [clef: string]: unknown } | number | unknown[],
    இ?: number,
  ): string => {
    return computed(() => {
      const messages = மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி(
        செய்திகள்?.value || {},
      );
      const meilleureLangueDispo = toutesLanguesAlternatives.value.find(
        (lg) => !!messages[சாபி]?.[lg],
      );

      const messageFinal = meilleureLangueDispo
        ? messages[சாபி][meilleureLangueDispo]
        : சாபி;

      const formatter = (மதிப்பு: unknown): string => {
        if (typeof மதிப்பு === "number") {
          return எண்ணை_வடிவூட்டு(மதிப்பு).value;
        }
        return (மதிப்பு as Ref).value ? (மதிப்பு as Ref).value : மதிப்பு;
      };

      const formatterMessage = (
        m: string,
        intp?: { [clef: string]: unknown } | unknown[],
      ): string => {
        const regexp = /{([^{]+)}/g;
        if (Array.isArray(intp)) {
          return m.replace(regexp, function (_, key) {
            return key >= intp.length ? key : formatter(intp[key]);
          });
        } else if (typeof intp === "object") {
          return m.replace(regexp, function (_, key) {
            return (key = intp[key]) == null ? "" : formatter(key);
          });
        }
        return m;
      };
      const messagesParN = messageFinal.split("|");

      if (messagesParN.length < 2) {
        return formatterMessage(
          messagesParN[0],
          typeof interpol !== "number" ? interpol : undefined,
        );
      } else {
        const nPluriel =
          typeof இ === "number"
            ? இ
            : typeof interpol === "number"
            ? interpol
            : 0;
        return formatterMessage(
          messagesParN[nPluriel] || messagesParN[messagesParN.length - 1],
          typeof interpol === "number" ? { n: interpol } : interpol, // Consistent avec https://kazupon.github.io/vue-i18n/guide/pluralization.html#accessing-the-number-via-the-pre-defined-argument
        );
      }
    }).value;
  };

  const toutesLanguesAlternatives = computed(() => {
    return [
      மொழி.value,
      ...மாற்றுமொழிகள்.value,
      ...கிளிமூக்கு_மொழிகள்.value.filter(
        (மொ) => மொ !== மொழி.value && !மாற்றுமொழிகள்.value.includes(மொ),
      ),
    ];
  });

  return { மொ, $மொ: மொ };
};

const கிடைக்கும்_மொழிகளை_பயன்படுத்து = ({
  பரிந்துரைகள் = "எனது",
  கிளி,
}: {
  பரிந்துரைகள்: "எனது" | "எல்லாம்" | "வேண்டாம்";
  கிளி?: கிளிமூக்கு;
}) => {
  கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const nuchabäl = nuchabäl_கண்டுப்பிடி();

  const கிடைக்கும்_மொழிகள் = ref<string[]>([]);

  const செ_மறந்துவிடு: ((() => Promise<void>) | (() => void))[] = [];

  onMounted(async () => {
    செ_மறந்துவிடு.push(
      await கிளி.மொழிகளை_கேள்ளு({
        செ: (இ) => (கிடைக்கும்_மொழிகள்.value = இ),
      }),
    );
  });
  onUnmounted(async () => {
    await Promise.all(செ_மறந்துவிடு.map((செ) => செ()));
  });

  // கிடைக்கும் மொழிகளின் குறியீடுகள்
  const fsOublier: ((() => Promise<void>) | (() => void))[] = [];

  const நம்_கிளிமூக்கு = inject<கிளிமூக்கு>("கிளிமூக்கு");

  const கிளிமூக்கு_மொழி_குறியீடுகள் = ref<string[]>([]);
  if (நம்_கிளிமூக்கு) {
    நம்_கிளிமூக்கு
      .மொழிகளை_கேள்ளு({
        செ: (மொழிகள்) => {
          if (!isEqual(மொழிகள், கிளிமூக்கு_மொழி_குறியீடுகள்.value))
            கிளிமூக்கு_மொழி_குறியீடுகள்.value = மொழிகள்;
        },
        பரிந்துரைகள்,
      })
      .then((f) => fsOublier.push(f));
  }

  const nuchabäl_மொழி_குறியீடுகள் = ref<string[]>([]);

  const nuchabäl_மொழி_குறியீடுகளை_மறந்துவிடு =
    nuchabäl.tatzeqelbejKonojelChabäl({
      sm: (codes: string[]) => (nuchabäl_மொழி_குறியீடுகள்.value = codes),
    });
  fsOublier.push(nuchabäl_மொழி_குறியீடுகளை_மறந்துவிடு);

  const கிடைக்கும்_மொழி_குறியீடுகள் = computed(() => {
    return [
      ...new Set([
        ...nuchabäl_மொழி_குறியீடுகள்.value,
        ...கிளிமூக்கு_மொழி_குறியீடுகள்.value,
      ]),
    ];
  });

  const மொழிகளும்_குறியீடுகளும் = computed<
    { மொழி: string; குறியீடு: string }[]
  >(() => {
    // On a pas besoin de lier les noms de langues de manière réactive parce que tatzeqelbejKonojelChabäl détectera
    // tout changement aux noms de langues, pas juste à leurs codes.
    return கிடைக்கும்_மொழி_குறியீடுகள்.value
      .map((குறியீடு) => {
        return {
          குறியீடு,
          மொழி: nuchabäl.rubiChabäl({ runuk: குறியீடு }),
        };
      })
      .filter((x) => x.மொழி) as { மொழி: string; குறியீடு: string }[];
  });

  const மொழியின்_பெயர் = (குறியீடு: string | Ref<string | undefined>) => {
    return computed(() => {
      const குறியீட்டின்_மதிப்பு =
        typeof குறியீடு === "string" ? குறியீடு : குறியீடு.value;
      if (!குறியீட்டின்_மதிப்பு) return undefined;
      return மொழிகளும்_குறியீடுகளும்.value.find(
        (x) => x.குறியீடு === குறியீட்டின்_மதிப்பு,
      )?.மொழி;
    });
  };

  return {
    கிடைக்கும்_மொழி_குறியீடுகள்,
    மொழிகளும்_குறியீடுகளும்,
    மொழியின்_பெயர்,
    கிடைக்கும்_மொழிகள்,
  };
};

const மொழி_முன்னேற்றத்தை_பயன்படுத்து = ({
  மொழி,
  வகை = "வார்த்தை",
  கிளி,
}: {
  மொழி: string | Ref<string | undefined>;
  வகை: "வார்த்தை" | "சாபி";
  கிளி?: கிளிமூக்கு;
}): { மொழி_முன்னேற்றம்: Ref<முன்னேற்றம்_தகவல்கள் | undefined> } => {
  கிளி = கிளி || கிளியை_கண்டுப்பிடி();
  const மொழி_முன்னேற்றம் = ref<முன்னேற்றம்_தகவல்கள்>();

  let செ_மறந்துவிடு: () => Promise<void> | undefined;
  const மொழியின்_மதிப்பு = typeof மொழி === "string" ? மொழி : மொழி.value;
  onMounted(async () => {
    செ_மறந்துவிடு = await கிளி.முன்னேற்றத்தை_கேள்ளு({
      மொழி: மொழியின்_மதிப்பு,
      வகை,
      செ: (இ) => (மொழி_முன்னேற்றம்.value = இ),
    });
  });
  onUnmounted(async () => {
    if (செ_மறந்துவிடு) await செ_மறந்துவிடு();
  });
  if (typeof மொழி !== "string") {
    watchEffect(async () => {
      if (செ_மறந்துவிடு) await செ_மறந்துவிடு();
      if (மொழி.value) {
        செ_மறந்துவிடு = await கிளி.முன்னேற்றத்தை_கேள்ளு({
          மொழி: மொழி.value,
          வகை,
          செ: (இ) => (மொழி_முன்னேற்றம்.value = இ),
        });
      } else {
        மொழி_முன்னேற்றம்.value = undefined;
        செ_மறந்துவிடு = undefined;
      }
    });
  }

  return { மொழி_முன்னேற்றம் };
};

const சாபிகளை_பயன்படுத்து = ({ கிளி }: { கிளி?: கிளிமூக்கு }) => {
  கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const சாபிகள் = ref<string[]>();

  let செ_மறந்துவிடு: () => Promise<void> | undefined;
  onMounted(async () => {
    செ_மறந்துவிடு = await கிளி.சாபிகளை_கேள்ளு({
      செ: (இ) => (சாபிகள்.value = இ),
    });
  });
  onUnmounted(async () => {
    if (செ_மறந்துவிடு) await செ_மறந்துவிடு();
  });

  return { சாபிகள் };
};

const மொழிபெயர்ப்புகளை_பயன்படுத்து = ({
  கிளி,
}: {
  கிளி?: கிளிமூக்கு;
}): {
  அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகள்: Ref<மொழிபெயர்ப்பு_அகராதி_வகை>;
} => {
  கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகள் = ref<மொழிபெயர்ப்பு_அகராதி_வகை>({});

  let செ_மறந்துவிடு: () => Promise<void> | undefined;
  onMounted(async () => {
    செ_மறந்துவிடு = await கிளி.அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகளை_கேள்ளு({
      செ: (இ) => (அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகள்.value = இ),
    });
  });
  onUnmounted(async () => {
    if (செ_மறந்துவிடு) await செ_மறந்துவிடு();
  });

  return { அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகள் };
};

const பரிந்துரைகளை_பயன்படுத்து = ({
  கிளி,
}: {
  கிளி?: கிளிமூக்கு;
}): {
  பரிந்துரைகள்: Ref<பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[]>;
} => {
  கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const பரிந்துரைகள் = ref<பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[]>([]);

  let செ_மறந்துவிடு: () => Promise<void> | undefined;
  onMounted(async () => {
    செ_மறந்துவிடு = (
      await கிளி.மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
        செ: (இ) => (பரிந்துரைகள்.value = இ),
      })
    ).fOublier;
  });
  onUnmounted(async () => {
    if (செ_மறந்துவிடு) await செ_மறந்துவிடு();
  });

  return { பரிந்துரைகள் };
};

export const கிளிமூக்கை_உருவாக்கு = ({
  மொழி,
  மாற்றுமொழிகள் = [],
  கிளி,
}: {
  மொழி: string;
  மாற்றுமொழிகள்?: string[];
  கிளி: கிளிமூக்கு;
}) => {
  return {
    install: (செயலி: App) => {
      const விண்மீன் = செயலி.config.globalProperties.$constl;
      if (!விண்மீன்) throw Error("விண்மீன் கிடைக்கதில்லை.");

      const எண்ணிக்கை = செயலி.config.globalProperties.$எண்ணிக்கை;
      if (!எண்ணிக்கை) {
        const எண்கள் = எண்களை_உருவாக்கு({ மொழி, மாற்றுமொழிகள் });
        செயலி.use(எண்கள்);
      }

      செயலி.config.globalProperties.$கிளிமூக்கு = கிளி;
      செயலி.provide("கிளிமூக்கு", கிளி);
    },
  };
};

export const கிளிமூக்கை_பயன்படுத்து = () => {
  return {
    கிடைக்கும்_மொழிகளை_பயன்படுத்து,
    மொழி_முன்னேற்றத்தை_பயன்படுத்து,
    சாபிகளை_பயன்படுத்து,
    பரிந்துரைகளை_பயன்படுத்து,
    மொழிபெயர்ப்புகளை_பயன்படுத்து,
    மொழியாக்கம்_பயன்படுத்து,
  };
};
