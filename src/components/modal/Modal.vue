<template>
  <modal
    name="add-modal"
    classes="add-modal"
    height="auto"
    width="500px"
    @before-close="close"
  >
    <form @submit.prevent="formSubmit">
      <h3>Изменить данные</h3>
      <div class="form-group">
        <label for="name">Город:</label>
        <input
          id="name"
          type="text"
          class="form-control"
          v-model.trim="form.name"
          placeholder="Пример: Алматы"
          :class="isName ? 'is-invalid' : ''"
        />
        <p v-if="isName" class="invalid-feedback">
          Обязательное поле
        </p>
      </div>
      <div class="form-group" :class="getOneDivision[1].val == 0? 'block_none': ''">
        <label for="count">Обшее количество:</label>
        <input
          id="count"
          type="number"
          class="form-control"
          v-model.trim="form.count"
          placeholder="Пример: 100"
          :class="isCount ? 'is-invalid' : ''"
        />
        <p v-if="isCount" class="invalid-feedback">
          Обязательное поле
        </p>
      </div>

      <div class="actions">
        <button
          type="button"
          class="btn btn-outline-dark"
          @click="$emit('close')"
        >
          Отмена
        </button>
        <button type="submit" class="btn btn-dark" @click="update">
          Редактировать
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "add-modal",
  props: {
    getOneDivision: {},
  },
  data() {
    return {
      form: {
        name: "",
        count: null,
      },
      errors: [],
      isName: false,
      isCount: false,
    };
  },
  mounted() {
    this.$modal.show("add-modal");
    if (this.getOneDivision[0].data) {
      this.form.name = this.getOneDivision[0].data.name;
      this.form.count = this.getOneDivision[0].data.count;
    }
  },
  methods: {
    ...mapMutations(["UPDATE_MAIN_SIDEBAR"]),
    close() {
      this.$emit("close");
    },
    formSubmit() {
      if (!this.form.name) {
        this.isName = true;
      } else {
        this.isName = false;
      }
      if (!this.form.count) {
        this.isCount = true;
      } else {
        this.isCount = false;
      }
    },
    update() {
      if ((this.form.name && this.form.count) || this.getOneDivision[1].val == 0) {
        var indexDivision;
        // console.log(
        //   "this.getOneDivision[1].indexItem = ",
        //   this.getOneDivision[1].indexItem
        // );
        // console.log(
        //   "this.getOneDivision[1].main_index = ",
        //   this.getOneDivision[1].main_index
        // );
        if (this.getOneDivision[1].indexItem != null) {
          indexDivision = this.getOneDivision[1].main_index +"_" +this.getOneDivision[1].indexItem;
        } else {
          indexDivision = this.getOneDivision[1].main_index;
        }
        console.log("indexDivision = ", indexDivision);
        const payload = [
          {
            id: this.getOneDivision[0].data.id,
            name: this.form.name,
            count: this.form.count,
          },
          {
            index: indexDivision,
          },
        ];
        this.UPDATE_MAIN_SIDEBAR(payload);
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss">
.add-modal {
  padding: 30px 40px;
  overflow-y: scroll;
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    h3 {
      margin-bottom: 30px;
    }
    label {
      width: 100%;
      margin-bottom: 20px;
      font-family: Gilroy;
      font-size: 16px;
      line-height: 30px;
      letter-spacing: 0.04em;
      color: #1f3f68;
    }
    input {
      width: 100%;
      height: 60px;
      padding: 21px;
      border: 1px solid #356ead;
      box-sizing: border-box;
      border-radius: 10px;
      font-family: Gilroy;
      font-size: 16px;
      line-height: 30px;
      letter-spacing: 0.04em;
      color: #1f3f68;
    }
    .actions {
      margin-top: 32px;
      display: flex;
      align-items: baseline;
      a {
        color: #eb5804;
      }
      button {
        margin-left: 10px;
        height: 60px;
        filter: drop-shadow(0px 0px 10px rgba(16, 112, 177, 0.2));
        box-shadow: 0px 1px 0px rgba(16, 112, 177, 0.2);
        border-radius: 10px;
        &:first-of-type {
          margin-right: auto;
        }
      }
    }
  }

  .block_none{
    display: none;
  }
}
</style>
