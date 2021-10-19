<template>
  <v-btn
      depressed
      :color="color"
      :disabled="disabled || $parent.isLoading"
      :loading="$parent.isLoading"
      type="submit"
      @click="$emit('submit')"
      block
      class="mt-4"
    >
    <span class="fvl-submit-text">
      <slot />
    </span>
    <slot
      v-if="loader && $parent.isLoading"
      :is-loading="$parent.isLoading"
      :upload-percentage="$parent.uploadPercentage"
      name="loader"
    >
      <div class="fvl-submit-button-loader">
        <div
          :style="{width: $parent.uploadPercentage + '%'}"
          class="fvl-submit-button-loader-progress"
        />
      </div>
    </slot>
  </v-btn>
</template>

<script>
  export default {
    props: {
      loader: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      buttonClass: {
        type: String,
        default: null
      },
      color: {
        type: String,
        default: 'primary',
        required: false
      }
    }
  }
</script>
      