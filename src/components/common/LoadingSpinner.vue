<!--Icon loading (animated)-->
<template>
  <div
    class="loading-screen"
    v-show="loading"
    v-bind:class="classes"
    v-bind:style="{ backgroundColor: bc }"
  >
    <component v-if="customLoader" v-bind:is="customLoader"></component>
    <div v-else>
      <div class="loading-circle"></div>
      <p class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoadingSpinner",
  data() {
    return {
      text: "Loading",
      dark: false,
      classes: null,
      loading: false,
      background: null,
      customLoader: null,
    };
  },
  computed: {
    bc() {
      return (
        this.background ||
        (this.dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)")
      );
    },
  },
};
</script>
<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  user-select: none;
}
.loading-circle {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-left-color: #ababab;
  animation: circleanimation 0.45s linear infinite;
}
.loading-text {
  margin-top: 15px;
  color: #808080;
  font-size: 12px;
  text-align: center;
}
@keyframes circleanimation {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>