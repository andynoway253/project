<template lang="pug">
    div(class="content")
        div(class="background inner")
            div
                p(class="success") 付款成功
                a(class="continue" href="#/product") 繼續逛逛
</template>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

.background {
    height: 500px;
    background-image: url("https://bit.ly/2P7GhNd");
    margin: 50px auto;
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;

    .success {
        font-size: 50px;
        font-weight: bolder;
        color: #3F5D45;
    }

    .continue {
        display: block;
        width: 100%;
        font-size: 24px;
        padding: 15px 20px;
        background-color: #ffe180;
    }
}

.process-steps {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
}

.process-steps .step-circle {
    height: 20px;
    width: 20px;
    border: 1px solid #8DA291;
    border-radius: 20px;
    position: relative;
    background-color: #3F5D45;
    z-index: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
}
</style>