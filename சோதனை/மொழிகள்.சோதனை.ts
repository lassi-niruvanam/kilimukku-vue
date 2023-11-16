import { VueWrapper, mount } from "@vue/test-utils";
import { beforeAll, describe, test } from "vitest";

import { மொழிகளை_உருவாக்கு } from "../மூலம்/குறியீட்டு";

import சோதனை_கூறு from "./கூறுகள்/மொழிகள்.vue";

describe("மொழிகள்", function () {
  let enveloppe: VueWrapper<any, any>;
  beforeAll(() => {
    enveloppe = mount(சோதனை_கூறு, {
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
    expect(enveloppe.vm.nuchabäl).not.toBeUndefined();
  });
  test("விரும்பின மொழி கிடைத்தது", async ({ expect }) => {
    expect(enveloppe.vm.மொழி).toBe("fr");
  });
  test("மொழியின் மாற்றம்", async ({ expect }) => {
    enveloppe.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("த");
    expect(enveloppe.vm.மொழி).toBe("த");
  });

  test("மாற்றுமொழிகள்", async ({ expect }) => {
    enveloppe.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு(["fr", "த", "తె"]);
    expect(enveloppe.vm.மாற்றுமொழிகள்).toStrictEqual(["த", "తె"]);
  });

  test("அகராதியிலிருந்து மொழிபெயர்ப்பு", async ({ expect }) => {
    expect(enveloppe.vm.பெயர்).toBe("kilimukku");
    enveloppe.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("த");
    expect(enveloppe.vm.பெயர்).toBe("கிளிமூக்கு");
  });

  test("வலதிலிருந்து இடது மொழி", async ({ expect }) => {
    expect(enveloppe.vm.மொழி_திசை).toBe(false);
    expect(enveloppe.vm.பார்சிகம்_திசை).toBe(true);
    enveloppe.vm.மொழிகளை_தேர்ந்தெடுக்கொள்ளு("فا");
    expect(enveloppe.vm.மொழி_திசை).toBe(true);
  });
});
