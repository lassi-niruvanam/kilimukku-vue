import { type Ref, unref, MaybeRef } from "vue";

export const குறிப்பின்_மதிப்பை_பெறு = <வ>(இ: வ | Ref<வ>): வ => {
  return unref(இ);
};

export type குறிப்பு_அல்லது_மதிப்பு<வ> = MaybeRef<வ>;
