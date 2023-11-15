<template>
<p></p>
</template>
<script setup lang="ts">
import {type Ref, inject} from "vue";

const { தேர்ந்தெடுத்தப்பட்ட_மொழிகள், தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு, நினைவிகள் } = inject<{
    தேர்ந்தெடுத்தப்பட்ட_மொழிகள்: Ref<string[]>;
    தேர்ந்தெடுத்தப்பட்ட_எண்ணுரு: Ref<string>;
    நினைவிகள்?: {
      மொழி?: string;
      எண்ணுரு?: string;
    };
  }>("விருப்பங்கள்")!;
</script>