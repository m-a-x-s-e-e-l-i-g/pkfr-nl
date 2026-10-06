<script>
    import JamDetail from '$lib/components/calendar/JamDetail.svelte';
    export let data;
</script>

<JamDetail event={data.event} />
