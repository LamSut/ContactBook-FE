<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';
import useContacts from '@/composables/useContacts';

const props = defineProps({
    contactId: { type: String, required: true },
});

const router = useRouter();
const route = useRoute();

const { fetchContact, updateContact, deleteContact } = useContacts();

const contact = fetchContact(props.contactId);
const message = ref('');

async function onUpdateContact(contact) {
    try {
        updateContact(contact);
        alert('Liên hệ được cập nhật thành công.');
    } catch (error) {
        console.log(error);
    }
}

async function onDeleteContact(id) {
    if (confirm('Bạn muốn xóa Liên hệ này?')) {
        try {
            deleteContact(id);
            alert('Liên hệ được xoá thành công.');
            router.push({ name: 'contactbook' });
        } catch (error) {
            console.log(error);
        }
    }
}
</script>

<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="onUpdateContact" @delete:contact="onDeleteContact" />
        <p>{{ message }}</p>
    </div>
</template>