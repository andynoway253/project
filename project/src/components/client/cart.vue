<template lang="pug">
	div(class="inner")
		div(class="content" v-if="GET_SHOPCARTDATA.length !== 0")
			div(class="leftList")
				div(class="Title") 您的購物車
				div(class="cartList")
					div(class="productItem" v-for="(item, index) in GET_SHOPCARTDATA")
						div(class="info")
							img(:src="item.productInfo.imageUrl")
							div(style="display: flex; align-items: center; width: 100%;")
								div(class="infoStr")
									p {{item.productInfo.title}} 
									p $NT {{item.productInfo.price ? item.productInfo.price : 0}}
								div(class="number")
									button(class="less" @click="delOneCart(item)") -
									input(class="input" :value="item.amount")
									button(class="plus" @click="addCart(item)") +
						div(class="tool" style="margin-left: auto")
							span $NT {{item.productInfo.price * item.amount ? item.productInfo.price * item.amount : 0}}
							button(@click="delCart(item)")
								icon(name="trash")
			div(class="rightBill")
				div(class="Title") 訂單摘要
				div(class="billItem")
					span 小計 
					span $NT {{GET_TOTALPRICE.TOTAL}}
				div(class="billItem")
					span 運費
					span $NT {{GET_TOTALPRICE.FARE}}
				div(class="billItem")
					span 總計
					span $NT {{GET_TOTALPRICE.TOTAL + GET_TOTALPRICE.FARE}}
				a(class="checkoutLink" href="#/checkout") 
					span(style="margin-right: 10px;") 結帳
					icon(name="money-check-alt" scale="1.5")
		div(class="content" v-else)
			div(class="noGood")
				p 購物車內無商品
				a(href="#/product" class="goShopping") 前往商城選購
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'cart',
	data () { return {} },
	created() {
		// this.getCart()
		// this.deleteCart()
	},
	computed: {
		...mapGetters([
			'GET_SHOPCARTDATA',
			'GET_TOTALPRICE',
        ])
	},
	methods: {
		...mapActions([
			// 'getCart',
			'addCart',
			'delCart',
			'delOneCart'
		]),
		// deleteCart() {
		// 	const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/-LfdG53aSCluB8dzlAtA`
		// 	this.$http.delete(api).then((response) => {
		// 		console.log(response)           
		// 	})
		// }
	}
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

button {
	color: #3f5d45;
	border: 0;
	background-color: transparent;
	font-weight: bolder;
	outline:none;
	cursor: pointer;
}

span {
	font-weight: bolder;
}

img {
	width: 120px;
	height: 120px;
	margin-right: 20px;
}

input {
	border: 0;
}

.inner {
    max-width: 1200px;
    margin: auto;
}
.content {
	display: flex;
	margin: 30px auto;
	.leftList {
		width: 70%;
		max-height: 480px;
		margin-right: 20px;
		overflow: auto;
		.Title {
			padding: 16px;
			color: #3f5d45;
			background-color: #EAF0ED;
			font-size: 24px;
			font-weight: bolder;
		}

		.cartList {
			margin: 20px 0;
			.productItem {
				display: flex;
				margin: 40px 0;
				.info {
					display: flex;
					align-items: center;
					width: 80%;
					.infoStr {
						text-align: left;
						font-size: 18px;
						font-weight: bolder;
					}

					.number {
						display: flex;
						width: 145px;
						margin-left: auto;
						.less, .plus {
							flex: 1;
    						border: 1px solid #EAF0ED;
						}
						input {
							width: 1%;
							flex: 2;
							text-align: center;
							border: 1px solid #EAF0ED;
							height: calc(1rem + 30px + 2px);
						}
					}
				}

				.tool {
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.rightBill {
		width: 30%;
		max-height: 313px;
		background-color: #3f5d45;
		.Title {
			margin: 15px;
			padding-bottom: 15px;
			color: #EAF0ED;
			border-bottom: 1px solid #EAF0ED;
			font-size: 24px;
		}

		.billItem {
			display: flex;
			color: #EAF0ED;
			padding: 16px;
			margin-top: -1px;
			justify-content: space-between;
			&:nth-child(4) {
				font-size: 20px;
			}
		}
		
		.checkoutLink {
			display: block; //	a標籤要改為block width才會生效
			width: 100%;			
			padding: 15px;
			background-color: #FFE180;
			font-size: 20px;
			color: #3f5d45;
			text-decoration: none;
		}
	}

	.noGood {
		width: 100%;
		padding: 50px;
		background-color: #EAF0ED;
		p {
			margin-bottom: 60px;
			font-size: 36px;
			font-weight: bolder;
		}
		.goShopping {
			padding: 20px;
			font-size: 24px;
			font-weight: bolder;
			background-color: #ffe180;
		}
	}
}

@media screen and (max-width: $pad) {
	.content{
		flex-wrap: wrap;
		.leftList {
			width: 100%;
			margin: 0;
			padding: 10px;
		}

		.rightBill {
			width: 70%;
			margin: 0 auto;
		}
	}
}

@media screen and (max-width: $mobile) {


	.content{
		.leftList .cartList .productItem {
			flex-wrap: wrap;
		}
		.rightBill {
			width: 100%;
		}
	}
}
</style>
