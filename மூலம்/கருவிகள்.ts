import type { Ref } from "vue";

export const குறிப்பின்_மதிப்பை_பெறு = <வ>(இ: வ | Ref<வ>): வ => {
  return (இ as Ref<வ>)?.value ? (இ as Ref<வ>).value : (இ as வ);
};

export type குறிப்பு_அல்லது_மதிப்பு<வ> = வ | Ref<வ>;
