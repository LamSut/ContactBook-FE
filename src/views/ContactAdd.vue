<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';
import useContacts from '@/composables/useContacts';
import { DEFAULT_AVATAR } from '@/constants';

const router = useRouter();
const route = useRoute();

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
        createContact(contact);
        alert('Liên hệ được tạo thành công.');
        router.push({ name: 'contactbook' });
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