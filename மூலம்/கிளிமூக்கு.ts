import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";
import type { Ref, App, ComputedRef } from "vue";
import { types } from "@constl/ipa";
import { v4 as uuidv4 } from "uuid";

import Semaphore from "@chriscdn/promise-semaphore";
import pkg from "lodash";
const { isEqual } = pkg;

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
import { குறிப்பின்_மதிப்பை_பெறு } from "./கருவிகள்.js";

const கிளியை_கண்டுப்பிடி = () => {
  const கிளி = inject<கிளிமூக்கு>("கிளிமூக்கு");
  if (!கிளி) throw new Error("கிளிமூக்கு கிடைத்ததில்லை.");
  return கிளி;
};

class சேமிக்கப்பட்ட_செய்திகள் {
  செய்திகள்: {
    [கிளி_அடையாளம்: string]: {
      கிளி: கிளிமூக்கு;
      விருப்பங்கள்: {
        [அடையாளம்: string]: {
          செய்திகள்: Ref<மரம்_மொழிபெயர்ப்பு_அகராதி_வகை>;
          கோரிக்கைகள்: Set<string>;
          மறந்துவிடு?: types.schémaFonctionOublier;
          விருப்பங்கள்: { பரிந்துரைகள்: "எனது" | "எல்லாம்" | "வேண்டாம்" };
        };
      };
    };
  };
  பூட்டு: Semaphore;

  constructor() {
    this.செய்திகள் = {};
    this.பூட்டு = new Semaphore();
  }

  அடையாளமத்தைப்_பெறு({
    கிளி,
    பரிந்துரைகள்,
  }: {
    கிளி: கிளிமூக்கு;
    பரிந்துரைகள்: "எனது" | "எல்லாம்" | "வேண்டாம்";
  }): {
    கிளி_அடையாளம்: string;
    விருப்பங்களின்_அடையாளம்: string;
  } {
    return {
      கிளி_அடையாளம்: கிளி.தனித்துவமிக்க_அடையாளம்,
      விருப்பங்களின்_அடையாளம்: கிளி.தனித்துவமிக்க_அடையாளம் + பரிந்துரைகள்,
    };
  }

  உருவாக்கு({
    கிளி,
    பரிந்துரைகள்,
  }: {
    பரிந்துரைகள்: "எனது" | "எல்லாம்" | "வேண்டாம்";
    கிளி: கிளிமூக்கு;
  }): {
    செய்திகள்: Ref<மரம்_மொழிபெயர்ப்பு_அகராதி_வகை>;
    அடையாளம்: { கிளி: string; விருப்பங்கள்: string };
  } {
    const { கிளி_அடையாளம், விருப்பங்களின்_அடையாளம் } = this.அடையாளமத்தைப்_பெறு({
      கிளி,
      பரிந்துரைகள்,
    });

    if (!this.செய்திகள்[கிளி_அடையாளம்]) {
      this.செய்திகள்[கிளி_அடையாளம்] = {
        கிளி,
        விருப்பங்கள்: {},
      };
    }

    if (!this.செய்திகள்[கிளி_அடையாளம்].விருப்பங்கள்[விருப்பங்களின்_அடையாளம்]) {
      this.செய்திகள்[கிளி_அடையாளம்].விருப்பங்கள்[விருப்பங்களின்_அடையாளம்] = {
        செய்திகள்: ref<மரம்_மொழிபெயர்ப்பு_அகராதி_வகை>({}),
        கோரிக்கைகள்: new Set(),
        மறந்துவிடு: undefined,
        விருப்பங்கள்: { பரிந்துரைகள் },
      };
    }

    const செய்திகள் =
      this.செய்திகள்[கிளி_அடையாளம்].விருப்பங்கள்[விருப்பங்களின்_அடையாளம்]
        .செய்திகள்;

    return {
      செய்திகள்,
      அடையாளம்: { கிளி: கிளி_அடையாளம், விருப்பங்கள்: விருப்பங்களின்_அடையாளம் },
    };
  }
  async கேள்ளு({
    அடையாளம்,
  }: {
    அடையாளம்: { கிளி: string; விருப்பங்கள்: string };
  }): Promise<string> {
    const கோரிக்கை_அடையாளம் = uuidv4();

    const { கிளி } = this.செய்திகள்[அடையாளம்.கிளி];

    const பூட்டு_சாபி = JSON.stringify(அடையாளம்);
    await this.பூட்டு.acquire(பூட்டு_சாபி);

    if (
      !this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்[அடையாளம்.விருப்பங்கள்]
        .மறந்துவிடு
    ) {
      const செய்திகள் =
        this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்[அடையாளம்.விருப்பங்கள்]
          .செய்திகள்;
      const மறந்துவிடு = await கிளி.மொழிபெயர்ப்புகளை_கேள்ளு({
        செ: (மொழிபெயர்ப்புகள்) => {
          செய்திகள்.value =
            மொழிபெயர்ப்பு_அகராதியிலிருந்து_மரம்(மொழிபெயர்ப்புகள்);
        },
        பரிந்துரைகள்:
          this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்[அடையாளம்.விருப்பங்கள்]
            .விருப்பங்கள்.பரிந்துரைகள்,
      });
      this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்[
        அடையாளம்.விருப்பங்கள்
      ].மறந்துவிடு = மறந்துவிடு;
    }
    const { கோரிக்கைகள் } =
      this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்[அடையாளம்.விருப்பங்கள்];
    கோரிக்கைகள்.add(கோரிக்கை_அடையாளம்);
    this.பூட்டு.release(பூட்டு_சாபி);

    return கோரிக்கை_அடையாளம்;
  }

  async மறந்துவிடு({
    அடையாளம்,
    கோரிக்கை_அடையாளம்,
  }: {
    அடையாளம்: { கிளி: string; விருப்பங்கள்: string };
    கோரிக்கை_அடையாளம்: string;
  }) {
    const பூட்டு_சாபி = JSON.stringify(அடையாளம்);
    await this.பூட்டு.acquire(பூட்டு_சாபி);
    const தகவல்கள் =
      this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்[அடையாளம்.விருப்பங்கள்];
    if (தகவல்கள்) {
      தகவல்கள்.கோரிக்கைகள்.delete(கோரிக்கை_அடையாளம்);
      if (தகவல்கள்.கோரிக்கைகள்.size === 0) {
        if (தகவல்கள்.மறந்துவிடு) await தகவல்கள்.மறந்துவிடு();
        delete this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்[
          அடையாளம்.விருப்பங்கள்
        ];
      }
      if (!Object.keys(this.செய்திகள்[அடையாளம்.கிளி].விருப்பங்கள்).length) {
        delete this.செய்திகள்[அடையாளம்.கிளி];
      }
    }
    this.பூட்டு.release(பூட்டு_சாபி);
  }
}

const செய்திகளைப்_பயன்படுத்து = ({
  பரிந்துரைகள் = "எனது",
  கிளி,
}: {
  பரிந்துரைகள்?: "எனது" | "எல்லாம்" | "வேண்டாம்";
  கிளி?: கிளிமூக்கு;
}) => {
  கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const மேலாளர் = inject<சேமிக்கப்பட்ட_செய்திகள்>("செய்திகள்")!;
  let கோரிக்கை_அடையாளம்: string;

  const { செய்திகள், அடையாளம் } = மேலாளர்.உருவாக்கு({
    கிளி,
    பரிந்துரைகள்,
  });

  onMounted(async () => {
    கோரிக்கை_அடையாளம் = await மேலாளர்.கேள்ளு({ அடையாளம் });
  });

  onUnmounted(async () => {
    if (கோரிக்கை_அடையாளம்)
      await மேலாளர்.மறந்துவிடு({ அடையாளம், கோரிக்கை_அடையாளம் });
  });

  return { செய்திகள் };
};

const மொழியாக்கம்_பயன்படுத்து = (
  {
    பரிந்துரைகள் = "எனது",
    கிளி,
  }: {
    பரிந்துரைகள்?: "எனது" | "எல்லாம்" | "வேண்டாம்";
    கிளி?: கிளிமூக்கு;
  } = { பரிந்துரைகள்: "எனது" },
) => {
  const { மொழி, மாற்றுமொழிகள் } = மொழிகளைப்_பயன்படுத்து();
  const { எண்ணை_வடிவூட்டு } = எண்களைப்_பயன்படுத்து();

  const { செய்திகள் } = செய்திகளைப்_பயன்படுத்து({ கிளி, பரிந்துரைகள் });

  const { கிடைக்கும்_மொழி_குறியீடுகள்: கிளிமூக்கு_மொழிகள் } =
    கிடைக்கும்_மொழிகளை_பயன்படுத்து({ பரிந்துரைகள், கிளி });

  const மொழிபெயரப்பில்லாத_சாபிகள் = ref<string[]>([]);

  const மொ = (
    சாபி: string,
    இடைச்செருகல்?: { [சாபி: string]: unknown } | number | unknown[],
    இ?: number,
  ): ComputedRef<string> => {
    return computed(() => {
      const செய்தி_அகராதி = மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி(
        செய்திகள்.value || {},
      );
      if (!செய்தி_அகராதி) {
        if (!மொழிபெயரப்பில்லாத_சாபிகள்.value.includes(சாபி)) {
          மொழிபெயரப்பில்லாத_சாபிகள்.value = [
            ...மொழிபெயரப்பில்லாத_சாபிகள்.value,
            சாபி,
          ];
        }
        return சாபி;
      }

      const பிடித்த_கிடைக்ககூடிய_மொழி = அனைத்த_சாத்தியமான_மொழிகள்.value.find(
        (மொ) => !!செய்தி_அகராதி[சாபி]?.[மொ],
      );

      const இறுதியான_செய்தி = பிடித்த_கிடைக்ககூடிய_மொழி
        ? செய்தி_அகராதி[சாபி][பிடித்த_கிடைக்ககூடிய_மொழி]
        : சாபி;

      const வடிவூட்டு = (மதிப்பு: unknown): string => {
        if (typeof மதிப்பு === "number") {
          return எண்ணை_வடிவூட்டு(மதிப்பு).value;
        }
        return (மதிப்பு as Ref).value ? (மதிப்பு as Ref).value : மதிப்பு;
      };

      const செய்தியை_வடிவூட்டு = (
        செய்தி: string,
        இடை?: { [சாபி: string]: unknown } | unknown[],
      ): string => {
        // @: என்று தொடர்புகளுக்காக
        const தொடர்பு_சுருங்புறித்தொடர் = /@:([^\s\p{P}]+(\.[^\s\p{P}]+)*)/gu;
        செய்தி = செய்தி.replaceAll(
          தொடர்பு_சுருங்புறித்தொடர்,
          function (_, இணைப்பு_சாபி) {
            const இணைப்பு_சாபி_பிடித்த_கிடைக்ககூடிய_மொழி =
              அனைத்த_சாத்தியமான_மொழிகள்.value.find(
                (மொ) => !!செய்தி_அகராதி[இணைப்பு_சாபி]?.[மொ],
              );
            const இறுதியான_செய்தி = இணைப்பு_சாபி_பிடித்த_கிடைக்ககூடிய_மொழி
              ? செய்தி_அகராதி[இணைப்பு_சாபி][
                  இணைப்பு_சாபி_பிடித்த_கிடைக்ககூடிய_மொழி
                ]
              : இணைப்பு_சாபி;

            return இறுதியான_செய்தி;
          },
        );

        const சுருங்குறித்தொடர் = /{([^{]+)}/g;
        if (Array.isArray(இடை)) {
          return செய்தி.replace(சுருங்குறித்தொடர், function (_, சாபி) {
            return சாபி >= இடை.length ? சாபி : வடிவூட்டு(இடை[சாபி]);
          });
        } else if (typeof இடை === "object") {
          return செய்தி.replace(சுருங்குறித்தொடர், function (_, சாபி) {
            return (சாபி = இடை[சாபி]) == null ? "" : வடிவூட்டு(சாபி);
          });
        }

        return செய்தி;
      };

      const பன்மை_சார்ந்த_செய்திகள் = இறுதியான_செய்தி.split("|");

      if (பன்மை_சார்ந்த_செய்திகள்.length < 2) {
        return செய்தியை_வடிவூட்டு(
          பன்மை_சார்ந்த_செய்திகள்[0],
          typeof இடைச்செருகல் !== "number" ? இடைச்செருகல் : undefined,
        );
      } else {
        const பன்தன்மையின்_எண் =
          typeof இ === "number"
            ? இ
            : typeof இடைச்செருகல் === "number"
              ? இடைச்செருகல்
              : 0;
        return செய்தியை_வடிவூட்டு(
          பன்மை_சார்ந்த_செய்திகள்[பன்தன்மையின்_எண்] ||
            பன்மை_சார்ந்த_செய்திகள்[பன்மை_சார்ந்த_செய்திகள்.length - 1],
          typeof இடைச்செருகல் === "number"
            ? { இ: இடைச்செருகல், n: இடைச்செருகல் }
            : இடைச்செருகல், // இதுடன் இணக்கமானது: https://kazupon.github.io/vue-i18n/guide/pluralization.html#accessing-the-number-via-the-pre-defined-argument
        );
      }
    });
  };

  const அனைத்த_சாத்தியமான_மொழிகள் = computed(() => {
    return [
      மொழி.value,
      ...மாற்றுமொழிகள்.value,
      ...கிளிமூக்கு_மொழிகள்.value.filter(
        (மொ) => மொ !== மொழி.value && !மாற்றுமொழிகள்.value.includes(மொ),
      ),
    ];
  });
  const $மொ = (
    சாபி: string,
    இடைச்செருகல்?: { [சாபி: string]: unknown } | number | unknown[],
    இ?: number,
  ): string => {
    return மொ(சாபி, இடைச்செருகல், இ).value;
  };
  return { மொ, $மொ, மொழிபெயரப்பில்லாத_சாபிகள் };
};

const கிடைக்கும்_மொழிகளை_பயன்படுத்து = (
  {
    பரிந்துரைகள்,
    கிளி,
  }: {
    பரிந்துரைகள்?: "எனது" | "எல்லாம்" | "வேண்டாம்";
    கிளி?: கிளிமூக்கு;
  } = { பரிந்துரைகள்: "எனது" },
) => {
  const நம்ம_கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const nuchabäl = nuchabäl_கண்டுப்பிடி();

  const கிளிமூக்கு_மொழி_குறியீடுகள் = ref<string[]>([]);
  let கிளிமூக்கு_மொழி_குறியீடுகளை_மறந்துவிடு:
    | types.schémaFonctionOublier
    | undefined;
  onMounted(async () => {
    கிளிமூக்கு_மொழி_குறியீடுகளை_மறந்துவிடு = await நம்ம_கிளி.மொழிகளை_கேள்ளு({
      செ: (மொழிகள்) => {
        if (!isEqual(மொழிகள், கிளிமூக்கு_மொழி_குறியீடுகள்.value))
          கிளிமூக்கு_மொழி_குறியீடுகள்.value = மொழிகள்;
      },
      பரிந்துரைகள்,
    });
  });
  onUnmounted(async () => {
    if (கிளிமூக்கு_மொழி_குறியீடுகளை_மறந்துவிடு)
      await கிளிமூக்கு_மொழி_குறியீடுகளை_மறந்துவிடு();
  });

  const nuchabäl_மொழி_குறியீடுகள் = ref<string[]>([]);

  let nuchabäl_மொழி_குறியீடுகளை_மறந்துவிடு: () => void | undefined;
  onMounted(async () => {
    nuchabäl_மொழி_குறியீடுகளை_மறந்துவிடு = nuchabäl.tatzeqelbejKonojelChabäl({
      sm: (codes: string[]) => (nuchabäl_மொழி_குறியீடுகள்.value = codes),
    });
  });
  onUnmounted(async () => {
    if (nuchabäl_மொழி_குறியீடுகளை_மறந்துவிடு)
      nuchabäl_மொழி_குறியீடுகளை_மறந்துவிடு();
  });

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
      const குறியீட்டின்_மதிப்பு = குறிப்பின்_மதிப்பை_பெறு(குறியீடு);
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
  };
};

const மொழி_முன்னேற்றத்தை_பயன்படுத்து = ({
  மொழி,
  வகை = "வார்த்தை",
  கிளி,
}: {
  மொழி: string | Ref<string | undefined>;
  வகை?: "வார்த்தை" | "சாபி";
  கிளி?: கிளிமூக்கு;
}): { மொழி_முன்னேற்றம்: Ref<முன்னேற்றம்_தகவல்கள் | undefined> } => {
  const நம்ம_கிளி = கிளி || கிளியை_கண்டுப்பிடி();
  const மொழி_முன்னேற்றம் = ref<முன்னேற்றம்_தகவல்கள்>();

  let செ_மறந்துவிடு: (() => Promise<void>) | undefined;
  const மொழியின்_மதிப்பு = குறிப்பின்_மதிப்பை_பெறு(மொழி);
  onMounted(async () => {
    if (மொழியின்_மதிப்பு)
      செ_மறந்துவிடு = await நம்ம_கிளி.முன்னேற்றத்தை_கேள்ளு({
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
        செ_மறந்துவிடு = await நம்ம_கிளி.முன்னேற்றத்தை_கேள்ளு({
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

const சாபிகளை_பயன்படுத்து = ({ கிளி }: { கிளி?: கிளிமூக்கு } = {}) => {
  const நம்ம_கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const { மொழிபெயரப்பில்லாத_சாபிகள் } = மொழியாக்கம்_பயன்படுத்து();

  const மொழிபெயர்ப்புடன்_சாபிகள் = ref<string[]>([]);

  let செ_மறந்துவிடு: () => Promise<void> | undefined;
  onMounted(async () => {
    செ_மறந்துவிடு = await நம்ம_கிளி.சாபிகளை_கேள்ளு({
      செ: (இ) => (மொழிபெயர்ப்புடன்_சாபிகள்.value = இ),
    });
  });
  onUnmounted(async () => {
    if (செ_மறந்துவிடு) await செ_மறந்துவிடு();
  });

  const சாபிகள் = computed(() => {
    return [
      ...new Set([
        ...மொழிபெயரப்பில்லாத_சாபிகள்.value,
        ...மொழிபெயர்ப்புடன்_சாபிகள்.value,
      ]),
    ];
  });

  return { சாபிகள் };
};

const மொழிபெயர்ப்புகளை_பயன்படுத்து = ({
  கிளி,
}: {
  கிளி?: கிளிமூக்கு;
} = {}): {
  அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகள்: Ref<மொழிபெயர்ப்பு_அகராதி_வகை>;
} => {
  const நம்ம_கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகள் = ref<மொழிபெயர்ப்பு_அகராதி_வகை>({});

  let செ_மறந்துவிடு: () => Promise<void> | undefined;
  onMounted(async () => {
    செ_மறந்துவிடு = await நம்ம_கிளி.அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகளை_கேள்ளு({
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
} = {}): {
  பரிந்துரைகள்: Ref<பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[]>;
} => {
  const நம்ம_கிளி = கிளி || கிளியை_கண்டுப்பிடி();

  const பரிந்துரைகள் = ref<பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[]>([]);

  let செ_மறந்துவிடு: () => Promise<void> | undefined;
  onMounted(async () => {
    செ_மறந்துவிடு = (
      await நம்ம_கிளி.மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
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
  நினைவிகள்,
}: {
  மொழி: string;
  மாற்றுமொழிகள்?: string[];
  கிளி: கிளிமூக்கு;
  நினைவிகள்?: {
    மொழி?: string;
    எண்ணுரு?: string;
  };
}) => {
  return {
    install: (செயலி: App) => {
      const எண்ணிக்கை = செயலி.config.globalProperties.$எண்ணிக்கை;
      if (!எண்ணிக்கை) {
        const எண்கள் = எண்களை_உருவாக்கு({ மொழி, மாற்றுமொழிகள், நினைவிகள் });
        செயலி.use(எண்கள்);
      }

      செயலி.config.globalProperties.$கிளிமூக்கு = கிளி;
      செயலி.provide("கிளிமூக்கு", கிளி);
      செயலி.provide("செய்திகள்", new சேமிக்கப்பட்ட_செய்திகள்());
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
