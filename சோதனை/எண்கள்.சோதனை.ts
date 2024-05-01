import { beforeEach, describe, test } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { எண்களை_உருவாக்கு } from "@/குறியீட்டு.js";

import சோதனை_கூறு from "./கூறுகள்/எண்கள்.vue";

describe("எண்கள்", function () {
  let உறை: VueWrapper<any, any>;
  beforeEach(() => {
    உறை = mount(சோதனை_கூறு, {
      global: {
        plugins: [
          எண்களை_உருவாக்கு({
            மொழி: "fr",
          }),
        ],
      },
    });
  });
  test("எண்ணிக்கை கிடைக்கும்", async ({ expect }) => {
    expect(உறை.vm.எண்ணிக்கை).not.toBeUndefined();
  });
  test("தேர்ந்தெடுத்தப்பட்ட எண்ணுரு", async ({ expect }) => {
    expect(உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு).toBeUndefined();
    expect(உறை.vm.எண்ணுரு).toBe("latin");
  });
  test("மொழியின் மாற்றம்", async ({ expect }) => {
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = undefined;
    உறை.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("ಕ");
    await new Promise((résoudre) => setTimeout(résoudre, 10));
    expect(உறை.vm.எண்ணுரு).toBe("ಕನ್ನಡ");
  });
  test("தேர்ந்தெடுத்தப்பட்ட எண்ணுரு", async ({ expect }) => {
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = "தமிழ்";
    expect(உறை.vm.எண்ணுரு).toBe("தமிழ்");
  });
  test("எண்ணுரு_முறைமைகள்", async ({ expect }) => {
    expect(Array.isArray(உறை.vm.எண்ணுரு_முறைமைகள்)).toBe(true);
  });
  test("எண்ணை வடிவூட்டு", async ({ expect }) => {
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = "latin";
    expect(உறை.vm.வடிவூட்டப்பட்ட_எண்).toBe("123");
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = "ಕನ್ನಡ";
    expect(உறை.vm.வடிவூட்டப்பட்ட_எண்).toBe("೧೨೩");
  });
  test("எண் எழுத்து வடிவூட்டு", async ({ expect }) => {
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = "latin";
    expect(உறை.vm.வடிவூட்டப்பட்ட_எண்_எழுத்து).toBe("+(91) 23456-78901");
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = "ಕನ್ನಡ";
    expect(உறை.vm.வடிவூட்டப்பட்ட_எண்_எழுத்து).toBe("+(೯೧) ೨೩೪೫೬-೭೮೯೦೧");
  });
  test("பதிப்பை வடிவூட்டு", async ({ expect }) => {
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = "latin";
    expect(உறை.vm.வடிவூட்டப்பட்ட_பதிப்பு).toBe("1.20.1");
    உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு = "ಕನ್ನಡ";
    expect(உறை.vm.வடிவூட்டப்பட்ட_பதிப்பு).toBe("೧.೨೦.೧");
  });
});
