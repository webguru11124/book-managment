<template>
    <notifications group="userNotification" :duration="2000" :width="300" :max="4" animation-name="fade-left"
        position="bottom right">
        <template slot="body" slot-scope="props">
            <div :class="`minipopup-box`">
                <div :class="`d-flex align-items-center`">
                    <!-- <font-awesome-icon v-if="props.item.type === 'danger'" icon="exclamation-triangle"
                        class="mr-2 text-danger"></font-awesome-icon>
                    <font-awesome-icon v-else icon="info-circle" class="mr-2 text-info"></font-awesome-icon> -->
                    <div :class="`h5 mb-0 text-${props.item.type}`">{{ props.item.text }}</div>
                </div>
            </div>
            <button class="mfp-close" @click="props.close"></button>
        </template>
    </notifications>
</template>
  
<script>
</script>
  
<style lang="scss">
.vue-notification-wrapper {
    overflow: unset !important;
}

button.mfp-close {
    position: absolute;
    top: 0;
    right: 0;
    overflow: visible;
    opacity: 0.65;
    cursor: pointer;
    background: transparent;
    border: 0;
    text-indent: -9999px;
    transform: rotateZ(45deg);
    width: 41px;
    height: 41px;
    color: #838383;
    z-index: 1;

    &:hover {
        opacity: 1;
    }

    .mfp-image-holder & {
        width: 41px;
        color: #fff;
        text-align: left;
    }

    &:after {
        content: '';
        position: absolute;
        height: 17px;
        top: 12px;
        left: 20px;
        border-left: 1px solid;
    }

    &:before {
        content: '';
        position: absolute;
        width: 17px;
        top: 20px;
        left: 12px;
        border-top: 1px solid;
    }
}

.fade-left-enter-active,
.fade-left-leave-active,
.fade-left-move {
    transition: all 0.5s;
}

.fade-left-enter,
.fade-left-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
  