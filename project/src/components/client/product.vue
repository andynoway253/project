<template lang="pug">
	div(class="inner")
		div(class="background inner")
		div(class="content")
			div(class="leftMenu")
				div(class="Title") 甜點類別
				button(class="listItem" :class="{'active' : nowClas == index}" v-for="(item, index) in GET_PRODUCTDATACLAS" @click="changeClas(index)") {{GET_PRODUCTDATACLAS[index]}} ({{GET_COUNTCLAS[item]}})
				
			div(class="rightBox")
				div(class="productBox" v-for="(item, index) in productsFilter()" v-if="item.is_enabled")
					div(class="productImg" :style="{'background-image': 'url(' + item.imageUrl + ')'}")
						div(class="productClas") {{item.category}}
					div(class="productInfo")
						div(class="productName") {{item.title}}
						div(class="productPrice") NT {{!item.price ? 0 : item.price | currency}}
					div(class="addCart" @click="addCart(item)") 加入購物車
			
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'product',
    data () { 
		return {
			nowClas: 'All',
			clas: this.$store.state.productClas,
			products: []
		}
	 },
	created() {
		this.getProducts()
	},
	computed: {
        ...mapGetters([
			'GET_PRODUCTDATACLAS',
			'GET_PRODUCTDATA',
			'GET_COUNTCLAS',
        ])
    },
	methods: {
		...mapActions([
			'addCart',
			'getProducts',
		]),
		productsFilter() {
			if (this.nowClas == 'All') {
				return this.GET_PRODUCTDATA
			} else if (this.nowClas == 'Featured') {
				return this.GET_PRODUCTDATA.filter(item => item.category == this.clas[this.nowClas])
			} else if (this.nowClas == 'Popular') {
				return this.GET_PRODUCTDATA.filter(item => item.category == this.clas[this.nowClas])
			} else if (this.nowClas == 'New') {
				return this.GET_PRODUCTDATA.filter(item => item.category == this.clas[this.nowClas])
			}
		},
		changeClas(index) {
			this.nowClas = index
		}
	}
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

.background {
    height: 500px;
    background-image: url("https://bit.ly/2Qodh3Z");
    background-size: cover;
    background-position: center center;
}

.content {
	display: flex;
	margin-top: 50px;
}

.leftMenu {
	width: 30%;
	button {
		width: 100%;
		outline: none;
		color: #3f5d45;
		border: 0;
		background-color: transparent;
		cursor: pointer;
	}

	.Title {
		background-color: #3f5d45;
		color: #ffffff;
		padding: 16px;
		font-size: 24px;
	}

	.listItem {
		display: block;
		padding: 16px;
		border: 1px solid #EAF0ED;
		margin-top: -1px;
		font-size: 24px;
		
		&:hover {
			background-color: #EAF0ED;
			transition: background-color .5s;
		}
	}

	.listItem.active {
		background-color: #ddd;
	}
}

.rightBox {
	width: 70%;
	display: flex;
	flex-wrap: wrap;
	.productBox {
            width: 47%;
			margin: 0 0 20px 20px;
			transition: all 0.3s;
        .productImg {
            height: 315px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            position: relative;
        }

        .productInfo {
            display: flex;
            border: 1px solid #EAF0ED;
            .productName, .productPrice {
                width: 50%;
                padding: 0 10px;
                line-height: 50px;
                font-size: 18px;
                font-weight: bold;
                color: #3f5d45;
                border-right: 1px solid #EAF0ED;
            }           
        }

		.productClas {
            position: absolute;
            top: -10px;
            left: 20px;
            padding: 15px 5px;
            color: #fff;
            background-color: #3f5d45;
            writing-mode: vertical-rl;
            letter-spacing: 5px;
        }

        .addCart {
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            button {
                border: 0;
				background-color: transparent;
				outline: none;
            }
            background-color: #EAF0ED;
            border-color: #EAF0ED;
            line-height: 60px;

            &:hover {
                background-color: #6c757d;
                transition: background-color .5s;
            }
        }
		&:hover {
			transform: scale(1.01);
			box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 1);
		}
    }
}

@media screen and (max-width: $pad) {
    .content{
		flex-wrap: wrap;
		.leftMenu {
			width: 100%;
			padding: 10px;
		}

		.rightBox {
			width: 100%;
            .productBox {
                width: 100%;
                padding: 0 20px;
            }
		}
	}
}

@media screen and (max-width: $mobile) {
    .content .rightBox .productBox {
		margin: 0;	
		margin-bottom: 20px;
		transition: unset;
		transform: unset;
		box-shadow: unset;	
	}
}
</style>