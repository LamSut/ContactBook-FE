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

// async function getContact(id) {
//     try {
//         contact.value = await contactsService.fetchContact(id);
//     } catch (error) {
//         console.log(error);
//         router.push({
//             name: 'notfound',
//             params: { pathMatch: route.path.split('/').slice(1) },
//             query: route.query,
//             hash: route.hash,
//         });
//     }
// }

async function onUpdateContact(contact) {
    try {
        //bug 400, no handle 404 yet
        updateContact(props.contactId, contact);
        message.value = 'Liên hệ được cập nhật thành công.';
    } catch (error) {
        console.log(error);
    }
}

async function onDeleteContact(id) {
    if (confirm('Bạn muốn xóa Liên hệ này?')) {
        try {
            //con bug khi quay ve list
            deleteContact(id);
            router.push({ name: 'contactbook' });
        } catch (error) {
            console.log(error);
        }
    }
}

fetchContact(props.contactId);
</script>

<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="onUpdateContact" @delete:contact="onDeleteContact" />
        <p>{{ message }}</p>
    </div>
</template>