<template>
    <text>{{ text }}</text>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped></style>
