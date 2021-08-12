<template>
  <div v-bind:class="{ open: openOptions }">
    <div>{{ inputLabel }}</div>
    <div
      ref="inputWrapper"
      class="input-wrapper"
      :class="{ 'border-red': !isValidate, 'border-green': isFocus }"
    >
      <input
        v-tooltip.top="!isValidate && tooltipContent"
        :id="id"
        ref="inputField"
        class="info-uniform combobox-input"
        type="text"
        autocomplete="none"
        :value="content"
        @focus="updateValue($event.target.value)"
        @input="
          ($event) => {
            this.selected = '';
            this.hovered = '';
            updateValue($event.target.value);
          }
        "
        @click="updateValue($event.target.value)"
        @blur="onBlur"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        tabindex="1"
      />
      <div
        class="arrow-button"
        :class="{ open: showAll }"
        @click="showAllOptions"
      >
        <font-awesome-icon icon="chevron-down" />
      </div>
    </div>
    <div class="options">
      <div
        class="option"
        v-for="(option, index) in matches"
        :key="index"
        :class="{
          active: isActive(option.text),
          hovered: isHover(option.text),
        }"
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
      // Trạng thái đóng/mở của combobox
      open: false,

      // Index của option hiện tại
      current: -1,

      // Dữ liệu trong input có hợp lệ không
      isValidate: true,

      // Khi combobox được focus
      isFocus: false,

      // Trạng thái show tất cả option (Khi bấm vào nút mũi tên)
      showAll: false,

      // Option đang được lựa chọn
      selected: "",

      // Option đang được hover (Khi di chuyển giữa các option bằng phím mũi tên)
      hovered: "",

      // Tooltip
      tooltipContent: "",
    };
  },
  props: {
    // Nội dung option truyền vào
    content: {
      type: String,
      required: true,
    },

    // Danh sách option
    options: {
      type: Array,
      required: true,
    },

    id: String,
    inputLabel: String,
  },
  computed: {
    // Các option khớp với dữ liệu trong ô input
    matches() {
      if (!this.showAll) {
        return this.options.filter((obj) => {
          if (this.content != null && this.content != "") {
            return (
              obj.text
                .toLocaleUpperCase()
                .indexOf(this.content.toLocaleUpperCase()) > -1
            );
          } else {
            return this.options;
          }
        });
      } else {
        return this.options;
      }
    },

    // Mở danh sách option
    openOptions() {
      return this.matches.length !== 0 && this.open === true;
    },
  },
  methods: {
    // Cập nhật danh sách option (Khi có sự thay đổi trong ô input)
    updateValue(text) {
      this.showAll = false;
      this.isFocus = true;
      if (this.open == false) {
        this.open = true;
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
      this.$emit("changeValue", this.id, text);
    },

    // Khi combobox bị blur
    onBlur() {
      if (this.content == "") {
        this.isValidate = true;
      } else if (
        !this.options.some((e) => e.text.localeCompare(this.content))
      ) {
        this.isValidate = false;
      }
      this.isFocus = false;
      this.open = false;
      this.showAll = false;
    },

    // Khi nhấn enter
    enter() {
      this.$emit("input", this.matches[this.current].text);
      this.selected = this.matches[this.current].text;
      this.open = false;
      this.showAll = false;
      this.hovered = "";
      this.$emit("changeValue", this.id, this.selected);
    },

    // Khi điều hướng bằng các phím mũi tên
    up() {
      if (this.current > 0) {
        this.current--;
        this.hovered = this.matches[this.current].text;
      } else {
        this.current = this.matches.length - 1;
        this.hovered = this.matches[this.current].text;
      }
    },
    down() {
      if (this.current < this.matches.length - 1) {
        this.current++;
        this.hovered = this.matches[this.current].text;
      } else {
        this.current = 0;
        this.hovered = this.matches[this.current].text;
      }
    },

    // Một option được hover
    isHover(text) {
      return text == this.hovered;
    },

    // Một option được chọn (active)
    isActive(text) {
      return text == this.selected;
    },

    // Khi click vào option
    onOptionClicked(index) {
      this.$emit("input", this.matches[index].text);
      this.selected = this.matches[index].text;
      this.current = index;
      this.open = false;
      this.showAll = false;
      this.hovered = "";
      this.$emit("changeValue", this.id, this.selected);
    },

    // Mở tất cả option
    showAllOptions() {
      this.showAll = true;
      this.open = true;
      this.hovered = "";
      this.isValidate = true;
    },
  },
  created() {
    this.selected = this.content;
    this.isValidate = true;
    document.addEventListener("click", (event) => {
      let target = event.target;
      let inputWrapper = this.$refs.inputWrapper;
      if (!inputWrapper.contains(target)) {
        this.onBlur();
      }
    });
  },
  watch: {
    content: function (newVal) {
      this.selected = newVal;
    },
    isValidate: function() {
      if (this.id == "gender") {
        this.tooltipContent = "Thông tin giới tính không hợp lệ";
      }
      else if (this.id == "position-form") {
        this.tooltipContent = "Thông tin chức vụ không hợp lệ";
      }
      else if (this.id == "department-form") {
        this.tooltipContent = "Thông tin phòng ban không hợp lệ";
      }
      else if (this.id == "work-status") {
        this.tooltipContent = "Thông tin tình trạng công việc không hợp lệ";
      }
      else if (this.id == "position-page") {
        this.tooltipContent = "Thông tin chức vụ không hợp lệ";
      }
      else if (this.id == "department-page") {
        this.tooltipContent = "Thông tin phòng ban không hợp lệ";
      }
    }
  },
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>