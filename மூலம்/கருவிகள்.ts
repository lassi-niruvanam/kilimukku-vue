import { unref, MaybeRef, ComputedRef } from "vue";

export const குறிப்பின்_மதிப்பை_பெறு = <வ>(இ: MaybeRef<வ> | ComputedRef<வ>): வ => {
  return unref(இ);
};

export type குறிப்பு_அல்லது_மதிப்பு<வ> = MaybeRef<வ>;
