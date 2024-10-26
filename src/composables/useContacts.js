import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import contactsService from "@/services/contacts.service";
import { computed } from "vue";
import { useRouter, useRoute } from 'vue-router';

export default function useContacts() {
    const router = useRouter();
    const route = useRoute();
    const queryClient = useQueryClient();

    function fetchContacts(page) {
        const { data: contactsPage, ...rest } = useQuery({
            queryKey: ["contacts", page],
            queryFn: () => contactsService.fetchContacts(page.value),
        });

        const totalPages = computed(() => (contactsPage.value?.metadata?.lastPage ?? 1));
        const contacts = computed(() => (contactsPage.value?.contacts ?? []).sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA.localeCompare(nameB);
        }));

        return { totalPages, contacts, rest };
    }

    function fetchContact(id) {
        const { data: contact, error } = useQuery({
            queryKey: ["contacts", id],
            queryFn: async () => {
                try {
                    return await contactsService.fetchContact(id);
                } catch (error) {
                    console.error("Error fetching contact:", error);
                    router.push({
                        name: 'notfound',
                        params: { pathMatch: route.path.split('/').slice(1) },
                        query: route.query,
                        hash: route.hash,
                    });
                    return null;
                }
            }
        });
        return contact;
    }

    const createContactMutation = useMutation({
        mutationFn: contactsService.createContact,
        onSuccess: (data) => {
            queryClient.setQueryData(["contacts"], (oldData) => {
                if (!oldData) return data;
                return {
                    ...oldData,
                    contacts: [...oldData.contacts, data],
                };
            });
        },
        onError: (error) => {
            console.error('Error updating contact:', error);
        },
    });

    const updateContactMutation = useMutation({
        mutationFn: contactsService.updateContact,
        onSuccess: (data) => {
            queryClient.setQueryData(["contacts", data.id], data);
        },
        onError: (error) => {
            console.error('Error updating contact:', error);
        },
    });

    const deleteContactMutation = useMutation({
        mutationFn: contactsService.deleteContact,
        onSuccess: (data) => {
            queryClient.setQueryData(["contacts"], (oldData) => {
                if (!oldData) return data;
                return {
                    ...oldData,
                    contacts: [...oldData.contacts, data],
                };
            });
        },
        onError: (error) => {
            console.error('Error updating contact:', error);
        },
    })

    const deleteAllContactsMutation = useMutation({
        mutationFn: contactsService.deleteAllContacts,
        onSuccess: (data) => queryClient.setQueriesData(["contacts"], data),
        onError: (error) => {
            console.error('Error updating contact:', error);
        },
    });

    return {
        fetchContacts,
        fetchContact,
        createContact: createContactMutation.mutate,
        updateContact: updateContactMutation.mutate,
        deleteContact: deleteContactMutation.mutate,
        deleteAllContacts: deleteAllContactsMutation.mutate
    }

}