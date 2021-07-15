<template>
  <div v-bind:class="{ open: openSuggestion }">
    <div>{{ inputLabel }}</div>
    <div class="input-wrapper" :class="isValidate ? '' : 'border-red'">
      <input
        :id="id"
        class="info-uniform combobox-input"
        
        type="text"
        :value="value"
        @click="updateValue($event.target.value)"
        @input="updateValue($event.target.value)"
        @blur="onBlur"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
      />
      <div class="arrow-button" @mousedown="openAllSuggestion()">V</div>
    </div>
    <div class="options">
      <div
        class="option"
        v-for="(suggestion, index) in matches"
        :key="index"
        v-bind:class="{ active: isActive(index) }"
        @mousedown="suggestionClick(index)"
      >
        <div class="checkmark"></div>
        <div>{{ suggestion.text }}</div>
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
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    suggestions: {
      type: Array,
      required: true,
    },
    id: String,
    inputLabel: String,
  },
  computed: {
    matches() {
      return this.suggestions.filter((obj) => {
        if (this.value != null && this.value != "") {
          return (
            obj.text
              .toLocaleUpperCase()
              .indexOf(this.value.toLocaleUpperCase()) > -1
          );
        } else {
          return this.suggestions;
        }
      });
    },
    openSuggestion() {
      return (
        this.selection !== "" && this.matches.length !== 0 && this.open === true
      );
    },
  },
  methods: {
    updateValue(value) {
      if (this.open === false) {
        this.open = true;
        this.current = 0;
      }
      if (
        this.suggestions.some((e) =>
          e.text.toLocaleUpperCase().includes(value.toLocaleUpperCase())
        )
      ) {
        this.isValidate = true;
      } else {
        this.isValidate = false;
      }
      this.$emit("input", value);
    },
    onBlur() {
      if (!this.suggestions.some((e) => e.text === this.value)) {
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
    suggestionClick(index) {
      this.$emit("input", this.matches[index].text);
      this.open = false;
    },
    openAllSuggestion() {
      this.matches = this.suggestions;
      console.log(this.matches);
      this.open = true;
    }
  },
  // created() {
  //   let me = this;
  //   axios.get("http://cukcuk.manhnv.net/v1/Employees/").then((response) => {
  //     response.data.forEach((value) => {
  //       value.DateOfBirth = dayjs(value.DateOfBirth).format("DD-MM-YYYY");
  //       if (value.DateOfBirth == "Invalid Date") {
  //         value.DateOfBirth = "Không xác định";
  //       }
  //       if (value.Salary)
  //         value.Salary = value.Salary.toLocaleString().replaceAll(",", ".");

  //       me.employees.push(value);
  //     });
  //   });
  // },
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>