import { mount } from "@vue/test-utils";
import { describe, test } from "vitest";

import { விருப்பங்களை_உருவாக்கு } from "../மூலம்/குறியீட்டு";

import சோதனை_கூறு from "./கூறுகள்/விருப்பங்கள்.vue";

describe("விருப்பங்கள்", function () {
  test("மொழி", async ({ expect }) => {
    const உறை = mount(சோதனை_கூறு, {
      global: {
        plugins: [
          விருப்பங்களை_உருவாக்கு({
            மொழி: "fr",
          }),
        ],
      },
    });
    expect(உறை.vm.தேர்ந்தெடுத்தப்பட்ட_மொழிகள்).toStrictEqual(["fr"]);
    expect(உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு).toStrictEqual(undefined);
  });

  test("மாற்றுமொழிகள்", async ({ expect }) => {
    const உறை = mount(சோதனை_கூறு, {
      global: {
        plugins: [
          விருப்பங்களை_உருவாக்கு({
            மொழி: "fr",
            மாற்றுமொழிகள்: ["த", "తె"],
          }),
        ],
      },
    });
    expect(உறை.vm.தேர்ந்தெடுத்தப்பட்ட_மொழிகள்).toStrictEqual([
      "fr",
      "த",
      "తె",
    ]);
    expect(உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு).toStrictEqual(undefined);
  });
});
