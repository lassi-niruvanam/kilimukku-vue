import { VueWrapper, mount } from "@vue/test-utils";
import { afterAll, beforeAll, describe, test } from "vitest";

import கிளிமூக்கை_உருவாக்கு from "@/குறியீட்டு.js";
import விண்மீன்_உட்சேருகி from "./கருவிகள்/விண்மீன்-உட்சேருகி";
import { கிளிமூக்கு } from "@lassi-js/kilimukku";
import { constellation } from "@constl/utils-tests";
import { créerConstellation, types } from "@constl/ipa";
import { இதற்காக_காற்றிரு } from "./கருவிகள்/கருவிகள்";

import சோதனை_கூறு from "./கூறுகள்/கிளிமூக்கு.vue";

import மூல்_மொழிபெயர்ப்புகள் from "./வளங்கள்/மொழிபெயர்ப்புகள்.json" with {type: 'json'};

describe("கிளிமூக்கு", function () {
  let விண்மீனை_மறந்துவிடு: types.schémaFonctionOublier;
  let அடையாளம்: string;

  let உறை: VueWrapper<any, any>;
  beforeAll(async () => {
    const { clients, fOublier } = await constellation.créerConstellationsTest({
      n: 1,
      créerConstellation,
    });
    விண்மீனை_மறந்துவிடு = fOublier;
    const விண்மீன் = clients[0];
    அடையாளம் = await கிளிமூக்கு.உருவாக்கு({ விண்மீன் });
    உறை = mount(சோதனை_கூறு, {
      global: {
        plugins: [
          விண்மீன்_உட்சேருகி({ விண்மீன் }),
          கிளிமூக்கை_உருவாக்கு({
            மொழி: "த",
            மூல்_மொழிபெயர்ப்புகள்,
            அடையாளம்,
          }),
        ],
      },
    });
  });
  afterAll(async () => {
    if (விண்மீனை_மறந்துவிடு) விண்மீனை_மறந்துவிடு();
  });
  test("கிளிமூக்கு கிடைக்கும்", async ({ expect }) => {
    expect(உறை.vm.கிளிமூக்கு).not.toBeUndefined();
  });
  test("கிடைக்கும் மொழி குறியீடுகள்", async ({ expect }) => {
    expect(Array.isArray(உறை.vm.கிடைக்கும்_மொழி_குறியீடுகள்)).toBe(true);
    expect(உறை.vm.கிடைக்கும்_மொழி_குறியீடுகள்).toContain("த");
  });
  test("மொழிகளும் குறியீடுகளும்", async ({ expect }) => {
    expect(Array.isArray(உறை.vm.மொழிகளும்_குறியீடுகளும்)).toBe(true);
    expect([
      ...new Set(
        உறை.vm.மொழிகளும்_குறியீடுகளும்
          .map((மொழி: { குறியீடு: string; மொழி: string }) => Object.keys(மொழி))
          .flat(),
      ),
    ]).toEqual(["குறியீடு", "மொழி"]);
  });
  test("மொழியின் பெயர்", async ({ expect }) => {
    expect(உறை.vm.மொழி_பெயர்).toBe("ಕನ್ನಡ");
  });
  test("மொழியின் முன்னேற்றம்", async ({ expect }) => {
    expect(உறை.vm.பயன்படுத்தப்பட்ட_மொழி_முன்னேற்றம்).toStrictEqual({
      அங்கீகரிக்கப்பட்டவை: 118,
      பரிந்துரைக்கப்பட்டவை: 0,
      மொத்தம்: 118,
    });
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("ខ្ចែរ");
    await இதற்காக_காற்றிரு(() => உறை.vm.பயன்படுத்தப்பட்ட_மொழி_முன்னேற்றம்.அங்கீகரிக்கப்பட்டவை === 0);
    expect(உறை.vm.பயன்படுத்தப்பட்ட_மொழி_முன்னேற்றம்).toStrictEqual({
      அங்கீகரிக்கப்பட்டவை: 0,
      பரிந்துரைக்கப்பட்டவை: 0,
      மொத்தம்: 118,
    });
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("த");
    await இதற்காக_காற்றிரு(() => உறை.vm.பயன்படுத்தப்பட்ட_மொழி_முன்னேற்றம்.அங்கீகரிக்கப்பட்டவை !== 0);
    expect(உறை.vm.பயன்படுத்தப்பட்ட_மொழி_முன்னேற்றம்).toStrictEqual({
      அங்கீகரிக்கப்பட்டவை: 118,
      பரிந்துரைக்கப்பட்டவை: 0,
      மொத்தம்: 118,
    });
  });
  test("சாபிகள்", async ({ expect }) => {
    expect(உறை.vm.சாபிகள்).toStrictEqual([
      "விண்மீன்.பெயர்",
      "விண்மீன்.தலைப்பு",
      "சோதனை.பன்தன்மை",
      "சோதனை.தொடர்பு",
    ]);
  });
  test("பரிந்துரைகள்", async ({ expect }) => {
    (உறை.vm.கிளிமூக்கு as கிளிமூக்கு).மொழிபெயர்ப்பை_பரிந்துரையு({
      சாபி: "விண்மீன்.பெயர்",
      மொழிபெயர்ப்பு: "តារានិករ",
      இலக்கு_மொழி: "ខ្ចែរ",
      மூல்_மொழி: "த",
      மூல்_உரை: "விண்மீன்",
    });
    await இதற்காக_காற்றிரு(() => உறை.vm.பரிந்துரைகள்.length);
    expect(உறை.vm.பரிந்துரைகள்).toStrictEqual([
      {
        அடையாளம்: உறை.vm.பரிந்துரைகள்[0].அடையாளம்,
        பங்கேற்பாளர்: உறை.vm.பரிந்துரைகள்[0].பங்கேற்பாளர்,
        பரிந்துரை: {
          இலக்கு_மொழி: "ខ្ចែរ",
          சாபி: "விண்மீன்.பெயர்",
          தேதி: உறை.vm.பரிந்துரைகள்[0].பரிந்துரை.தேதி,
          மூல்_உரை: "விண்மீன்",
          மூல்_மொழி: "த",
          மொழிபெயர்ப்பு: "តារានិករ",
        },
      },
    ]);
  });

  test("அங்கீகரிக்கப்பட்ட மொழிபெயர்ப்புகள்", async ({ expect }) => {
    expect(உறை.vm.அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகள்).toStrictEqual({
      "சோதனை.தொடர்பு": {
        த: 'இது நம்ம தலைப்பு - "@:விண்மீன்.பெயர்"',
      },
      "சோதனை.பன்தன்மை": {
        த: "பூஜியம் | ஒன்று | இத்தனை {இ}",
      },
      "விண்மீன்.தலைப்பு": {
        த: "அறிவியலுக்காக விநியோகிக்கப்பட்ட தரவுத்தளங்கள்",
        ಕ: "ವಿಜ್ಞಾನಿಕ್ಕಾಗಿ ವಿತರಿಸಿದ ದತ್ತಾಂಶ",
      },
      "விண்மீன்.பெயர்": {
        த: "விண்மீன்",
        ಕ: "ನಕ್ಷತ್ರ",
      },
    });
  });

  test("மொழியாக்கம் பயன்படுத்து", async ({ expect }) => {
    await இதற்காக_காற்றிரு(() => உறை.vm.தலைப்பு !== "விண்மீன்.பெயர்");
    expect(உறை.vm.தலைப்பு).toBe("விண்மீன்");
  });

  test("புதுச பரிந்துரை", async ({ expect }) => {
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("ខ្ចែរ");
    await இதற்காக_காற்றிரு(() => உறை.vm.தலைப்பு !== "விண்மீன்");

    expect(உறை.get('[data-test="தலைப்பு"]').text()).toBe("តារានិករ");
  });

  test("பன்தன்மை", async ({ expect }) => {
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("த");

    await இதற்காக_காற்றிரு(() => உறை.vm.பன்தன்மை !== "சோதனை.பன்தன்மை");
    expect(உறை.get('[data-test="பன்தன்மை"]').text()).toBe("பூஜியம்");

    உறை.vm.எத்தனை = 1;
    await இதற்காக_காற்றிரு(() => உறை.vm.பன்தன்மை !== "பூஜியம்");
    expect(உறை.get('[data-test="பன்தன்மை"]').text()).toBe("ஒன்று");

    உறை.vm.எத்தனை = 3;
    await இதற்காக_காற்றிரு(() => உறை.vm.பன்தன்மை !== "ஒன்று");
    expect(உறை.get('[data-test="பன்தன்மை"]').text()).toBe("இத்தனை ௩");
  });

  test("தொடர்பு", async ({ expect }) => {
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("த");

    await இதற்காக_காற்றிரு(
      () =>
        உறை.vm.தொடர்பு !== "சோதனை.தொடர்பு" &&
        !உறை.vm.தொடர்பு.includes("விண்மீன்.பெயர்"),
    );
    expect(உறை.get('[data-test="தொடர்பு"]').text()).toBe(
      'இது நம்ம தலைப்பு - "விண்மீன்"',
    );
  });
});
