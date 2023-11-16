import { VueWrapper, mount } from "@vue/test-utils";
import { beforeAll, beforeEach, describe, test } from "vitest";
import விண்மீன் from "./கருவிகள்/விண்மீன்-உட்சேருகி.js";

import கிளிமூக்கை_உருவாக்கு from "@/குறியீட்டு.js";
import சோதனை_கூறு from "./கூறுகள்/கிளிமூக்கு.vue";
import மூல்_மொழிபெயர்ப்புகள் from "./வளங்கள்/மொழிபெயர்ப்புகள்.json";

describe("கிளிமூக்கு", function () {
  let உறை: VueWrapper<any, any>;
  beforeEach(() => {
    உறை = mount(சோதனை_கூறு, {
      global: {
        plugins: [
          விண்மீன்,
          கிளிமூக்கை_உருவாக்கு({
            மொழி: "fr",
            மூல்_மொழிபெயர்ப்புகள்,
          }),
        ],
      },
    });
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
    expect(உறை.vm.மொழி_முன்னேற்றம்).toStrictEqual({
      அங்கீகரிக்கப்பட்டவை: 53,
      பரிந்துரைக்கப்பட்டவை: 0,
      மொத்தம்: 53,
    });
  });
  test("சாபிகள்", async ({ expect }) => {
    expect(உறை.vm.சாபிகள்).toStrictEqual(["விண்மீன்.பெயர்", "விண்மீன்.தலைப்பு"]);
  });
});
