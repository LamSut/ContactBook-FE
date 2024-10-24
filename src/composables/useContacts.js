import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import contactsService from "@/services/contacts.service";
import { computed } from "vue";

export default function useContacts() {

    const queryClient = useQueryClient();

    function fetchContacts(page) {
        const { data: contactsPage, ...rest } = useQuery({
            queryKey: ["contacts", page],
            queryFn: () => contactsService.fetchContacts(page.value),
        });
        const totalPages = computed(() => (contactsPage.value?.metadata?.lastPage ?? 1));
        const contacts = computed(() => (contactsPage.value?.contacts ?? []));
        return { totalPages, contacts, rest };
    }

    function fetchContact(id) {
        const { data: contact } = useQuery({
            queryKey: ["contacts", id],
            queryFn: () => contactsService.fetchContact(id)
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