<script setup>
import { ref } from 'vue';
import ContactForm from '@/components/ContactForm.vue';
import useContacts from '@/composables/useContacts';
import { DEFAULT_AVATAR } from '@/constants';

const contact = ref({
    name: '',
    email: '',
    address: '',
    phone: '',
    favorite: false,
    avatar: DEFAULT_AVATAR,
});
const message = ref('');

const { createContact } = useContacts();
async function onCreateContact(contact) {
    try {
        await createContact(contact);
        message.value = 'Liên hệ được tạo thành công.';
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div v-if="contact" class="page">
        <h4>Thêm mới Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="onCreateContact" />
        <p>{{ message }}</p>
    </div>
</template>