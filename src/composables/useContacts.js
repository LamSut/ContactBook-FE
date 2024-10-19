import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import contactsService from "@/services/contacts.service";
import { computed } from "vue";

export default function useContacts() {
    function fetchContacts(page) {
        const { data: contactsPage, ...rest } = useQuery({
            queryKey: ["contacts", page],
            queryFn: () => contactsService.getContacts(page)
        });
        const totalPages = computed(() => (contactsPage.value?.metadata.lastPage ?? 1));
        const contacts = computed(() => (contactsPage.value?.contacts ?? []));
        return { totalPages, contacts, rest };
    }
    const queryClient = useQueryClient();

    function fetchContact(id) {
        const { data: contact } = useQuery({
            queryKey: ["contacts", id],
            queryFn: () => contactsService.getContact(id)
        });
        return contact;
    }

    const createContactMutation = useMutation({
        mutationFn: contactsService.createContact,
        onSuccess: (data) => queryClient.setQueriesData(["contact", "create"], data),
    });

    const updateContactMutation = useMutation({
        mutationFn: contactsService.updateContact,
        onSuccess: (data) => queryClient.setQueriesData(["contact", "update"], data)
    })

    const deleteContactMutation = useMutation({
        mutationFn: contactsService.deleteContact,
        onSuccess: (data) => queryClient.setQueriesData(["contact", "delete"], data),
    })

    const deleteAllContactsMutation = useMutation({
        mutationFn: contactsService.deleteAllContacts,
        onSuccess: (data) => queryClient.setQueriesData(["contacts"], data),
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