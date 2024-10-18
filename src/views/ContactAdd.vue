<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';
import contactsService from '@/services/contacts.service';
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

async function onCreateContact(contact) {
    try {
        await contactsService.createContact(contact);
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