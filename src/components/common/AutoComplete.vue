<template>
  <div v-bind:class="{ open: openOptions }">
    <div>{{ inputLabel }}</div>
    <div class="input-wrapper" :class="isValidate ? '' : 'border-red'">
      <input
        :id="id"
        class="info-uniform combobox-input"
        type="text"
        autocomplete="none"
        :value="value"
        :text="text"
        @click="updateValue($event.target.value)"
        @input="updateValue($event.target.value)"
        @blur="onBlur"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        tabindex="1"
      />
      <div class="arrow-button">
        <font-awesome-icon
          icon="chevron-down"
          @click="toggleArrow($event)"
        />
      </div>
    </div>
    <div class="options">
      <div
        class="option"
        v-for="(options, index) in matches"
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
      current: 0,
      isValidate: true,
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
          if (this.text != null && this.text != "") {
            return (
              obj.text
                .toLocaleUpperCase()
                .indexOf(this.text.toLocaleUpperCase()) > -1
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
      return (
        this.selection !== "" && this.matches.length !== 0 && this.open === true
      );
    },
  },
  methods: {
    updateValue(text) {
      this.showAll = false;
      if (this.open === false) {
        this.open = true;
        this.current = 0;
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
      if (!this.options.some((e) => e.text === this.text)) {
        this.isValidate = false;
      }
      this.open = false;
    },
    enter() {
      this.$emit("input", this.matches[this.current].text);
      this.open = false;
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
      this.open = false;
    },
    toggleArrow(event) {
      this.showAll = true;
      event.target.closest("svg").classList.toggle("open");
      this.open = !this.open;
    },
  },
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>