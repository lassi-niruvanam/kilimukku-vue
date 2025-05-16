import { mount } from "@vue/test-utils";
import { beforeAll, describe, test } from "vitest";

import { மொழிகளை_உருவாக்கு, மொழிகளைப்_பயன்படுத்து } from "../மூலம்/குறியீட்டு";

import { defineComponent, inject, ref } from "vue";

const சோதனை_கூற்றை_பெறு = () => {
  window.localStorage.clear();
  return defineComponent({
    setup() {

      const nuchabäl = inject("nuch'ab'äl");
      
      const மொழி_மாறிகள் = மொழிகளைப்_பயன்படுத்து();
      
      const மொழி_திசை = மொழி_மாறிகள்.வலதிலிருந்து_இடது_மொழி()
      const பார்சிகம்_திசை = மொழி_மாறிகள்.வலதிலிருந்து_இடது_மொழி("فا")

      const அகராதி = ref({fr: "kilimukku", த: "கிளிமூக்கு"})
      const பெயர் = மொழி_மாறிகள்.அகராதியிலிருந்து_மொழிபெயர்ப்பு(அகராதி);

      return {
        nuchabäl,
        ...மொழி_மாறிகள்,
        மொழி_திசை,
        பார்சிகம்_திசை,
        அகராதி,
        பெயர்,
      }
    },
    render() {
      return "";
    },
  });
}

describe("மொழிகள்", function () {
  let உறை: ReturnType<typeof mount<ReturnType<typeof சோதனை_கூற்றை_பெறு>>>;
  beforeAll(() => {
    உறை = mount(சோதனை_கூற்றை_பெறு(), {
      global: {
        plugins: [
          மொழிகளை_உருவாக்கு({
            மொழி: "fr",
          }),
        ],
      },
    });
  });
  test("nuch'ab'äl கிடைக்கும்", async ({ expect }) => {
    expect(உறை.vm.nuchabäl).not.toBeUndefined();
  });

  test("ஆரம்பத்தில் அகராதியிலிருந்து மொழிபெயர்ப்பு", async ({ expect }) => {
    expect(உறை.vm.பெயர்).toBe("kilimukku");
  });

  test("விரும்பின மொழி கிடைத்தது", async ({ expect }) => {
    expect(உறை.vm.மொழி).toBe("fr");
  });
  test("மொழியின் மாற்றம்", async ({ expect }) => {
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("த");
    expect(உறை.vm.மொழி).toBe("த");
  });

  test("மாற்றுமொழிகள்", async ({ expect }) => {
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு(["fr", "த", "తె"]);
    expect(உறை.vm.மாற்றுமொழிகள்).toStrictEqual(["த", "తె"]);
  });

  test("அகராதியிலிருந்து மொழிபெயர்ப்பு", async ({ expect }) => {
    expect(உறை.vm.பெயர்).toBe("kilimukku");
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("த");
    expect(உறை.vm.பெயர்).toBe("கிளிமூக்கு");
  });

  test("வலதிலிருந்து இடது மொழி", async ({ expect }) => {
    expect(உறை.vm.மொழி_திசை).toBe(false);
    expect(உறை.vm.பார்சிகம்_திசை).toBe(true);
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("فا");
    expect(உறை.vm.மொழி_திசை).toBe(true);
  });
});
