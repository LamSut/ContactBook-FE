<script setup>
defineProps({
  contact: { type: Object, required: true },
});
</script>

<template>
<div class="contact-details">
  <div class="image-container">
    <img class="img-fluid img-thumbnail" :src="contact.avatar" alt="" />
  </div>

  <div class="info-container">
    <div class="detail">
      <strong>Tên:</strong>
      {{ contact.name }}
    </div>
    <div class="detail">
      <strong>E-mail:</strong>
      {{ contact.email }}
    </div>
    <div class="detail">
      <strong>Địa chỉ:</strong>
      {{ contact.address }}
    </div>
    <div class="detail">
      <strong>Điện thoại:</strong>
      {{ contact.phone }}
    </div>
    <div class="detail">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="contact.favorite" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div>
  </div>
</div>
</template>