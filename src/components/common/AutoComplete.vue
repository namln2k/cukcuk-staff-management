<template>
  <div v-bind:class="{ open: openOptions }">
    <div>{{ inputLabel }}</div>
    <div
      ref="input-wrapper"
      class="input-wrapper"
      :class="{ 'border-red': !isValidate, 'border-green': isFocus }"
    >
      <input
        :id="id"
        class="info-uniform combobox-input"
        type="text"
        autocomplete="none"
        :value="value"
        :text="text"
        @focus="updateValue($event.target.value)"
        @input="updateValue($event.target.value)"
        @blur="onBlur"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        tabindex="1"
      />
      <div class="arrow-button" :class="{ 'open': showAll }" @click="showAll = true">
        <font-awesome-icon icon="chevron-down" />
      </div>
    </div>
    <div class="options">
      <div
        class="option"
        v-for="(option, index) in matches"
        :key="index"
        v-bind:class="{ active: isActive(index) }"
        @mousedown="onOptionClicked(index)"
      >
        <div class="checkmark"></div>
        <div>{{ option.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AutoComplete",
  data() {
    return {
      open: false,
      current: -1,
      isValidate: true,
      isFocus: false,
      showAll: false,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    id: String,
    inputLabel: String,
  },
  computed: {
    matches() {
      if (!this.showAll) {
        return this.options.filter((obj) => {
          if (this.value != null && this.value != "") {
            return (
              obj.text
                .toLocaleUpperCase()
                .indexOf(this.value.toLocaleUpperCase()) > -1
            );
          } else {
            return this.options;
          }
        });
      } else {
        return this.options;
      }
    },
    openOptions() {
      return this.matches.length !== 0 && this.open === true;
    },
  },
  methods: {
    updateValue(text) {
      this.showAll = false;
      this.isFocus = true;
      if (this.open == false) {
        this.open = true;
        this.current = -1;
      }
      if (
        this.options.some((e) =>
          e.text.toLocaleUpperCase().includes(text.toLocaleUpperCase())
        )
      ) {
        this.isValidate = true;
      } else {
        this.isValidate = false;
      }
      this.$emit("input", text);
    },
    onBlur() {
      if (this.value == "") {
        this.isValidate = true;
      } else if (!this.options.some((e) => e.text == this.value)) {
        this.isValidate = false;
      }
      this.isFocus = false;
      this.open = false;
      this.showAll = false;
    },
    enter() {
      this.$emit("input", this.matches[this.current].text);
      this.open = false;
      this.showAll = false;
    },
    up() {
      if (this.current > 0) {
        this.current--;
      }
    },
    down() {
      if (this.current < this.matches.length - 1) {
        this.current++;
      }
    },
    isActive(index) {
      return index === this.current;
    },
    onOptionClicked(index) {
      this.$emit("input", this.matches[index].text);
      this.current = index;
      this.open = false;
      this.showAll = false;
    },
  },
  created() {
    document.addEventListener("click", (event) => {
      let target = event.target;
      let inputWrapper = this.$refs["input-wrapper"];
      if (!inputWrapper.contains(target)) {
        this.onBlur();
      }
    });
  },
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>