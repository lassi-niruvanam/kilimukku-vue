import { flushPromises, mount } from "@vue/test-utils";
import { describe, test } from "vitest";

import { விருப்பங்களை_உருவாக்கு, விருப்பங்களை_பயன்படுத்து } from "../மூலம்/குறியீட்டு.js";

import { defineComponent } from "vue";

const சோதனை_கூற்றை_பெறு = () => {
  window.localStorage.clear();
  return defineComponent({
    setup() {
      const { தேர்ந்தெடுத்தப்பட்ட_மொழிகள், தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு } = விருப்பங்களை_பயன்படுத்து()
      return {
        // Nous appelons le composable et l'exposons dans le retour de l'instance du composant. Nous pourrons donc ensuite y accéder dans `enveloppe.vm`.
        தேர்ந்தெடுத்தப்பட்ட_மொழிகள்,
        தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு,
      };
    },
    render() {
      return "";
    },
  });
}

describe("விருப்பங்கள்", function () {
  test("மொழி", async ({ expect }) => {
    
    const உறை = mount(சோதனை_கூற்றை_பெறு(), {
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
    const உறை = mount(சோதனை_கூற்றை_பெறு(), {
      global: {
        plugins: [
          விருப்பங்களை_உருவாக்கு({
            மொழி: "fr",
            மாற்றுமொழிகள்: ["த", "తె"],
          }),
        ],
      },
    });
    await flushPromises()
    expect(உறை.vm.தேர்ந்தெடுத்தப்பட்ட_மொழிகள்).toStrictEqual(["fr", "த", "తె"]);
    expect(உறை.vm.தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு).toStrictEqual(undefined);
  });
});
