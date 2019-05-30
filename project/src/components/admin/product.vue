<template lang="pug">
	div
		div(class="text-right mt-4")
			button(class="btn btn-primary" @click="openModal(true)") 建立新產品

		table(class="table mt-4")
			thead
				tr
					th 產品名稱
					th 產品圖片
					th 分類
					th(class="text-right") 原價
					th(class="text-right") 售價
					th(class="text-right") 是否上架
					th(class="text-right") 編輯
			tbody
				tr(v-for="(item, index) in products")
					td {{item.title}}
					td 
						img(:src="item.imageUrl" style="width: 100px; height: 100px" v-if="item.imageUrl")
					td {{item.category}}
					td(class="text-right") {{!item.origin_price ? 0 : item.origin_price | currency}}
					td(class="text-right") {{!item.price ? 0 : item.price | currency}}
					td(class="text-right")
						span(class="text-success" v-if="item.is_enabled" class="text-success") 上架
						span(class="text-danger" v-else) 未上架
					td(class="text-right")
						button(class="btn btn-outline-primary btn-sm" @click="openModal(false, item)") 編輯
						button(class="btn btn-outline-danger btn-sm" @click="openDelModal(item)") 刪除

		Pagination(:pagination="pagination" @getInform="getProducts")

		<!-- Modal -->
		div(class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true")
			div(class="modal-dialog modal-lg" role="document")
				div(class="modal-content border-0")
					div(class="modal-header bg-dark text-white")
						h5(class="modal-title" id="exampleModalLabel")
							span(v-if="isNew === true") 新增產品
							span(v-else) 編輯產品
						button(type="button" class="close" data-dismiss="modal" aria-label="Close")
							span(aria-hidden="true") &times;

					div(class="modal-body")
						div(class="row")
							div(class="col-sm-4")
								div(class="form-group")
									label(for="image") 輸入圖片網址
									input(type="text" class="form-control" id="image" v-model='tempProduct.imageUrl' placeholder='請輸入圖片連結')
								div(class="form-group")
									label(for="customFile") 或 上傳圖片
									i(class="fas fa-spinner fa-spin")
									input(type="file" class="form-control" id="customFile" ref="files" @change="uploadFile")
								img(class="img-fluid" :src="tempProduct.imageUrl" alt="")

							div(class="col-sm-8")
								div(class="form-group")
									label(for="title") 標題
									input(type="text" class="form-control" id="title" v-model='tempProduct.title' placeholder="請輸入標題")

								div(class="form-row")
									div(class="form-group col-md-6")
										label(for="category") 分類
										select(v-model="tempProduct.category" class="form-control")
											option(v-for="(item, index) in GET_PRODUCTDATACLAS" v-if="item!=='所有甜點'" :value="item") {{item}} 
										
								div(class="form-row")
									div(class="form-group col-md-6")
										label(for="origin_price") 原價
										input(type="number" class="form-control" id="origin_price" v-model='tempProduct.origin_price' placeholder="請輸入原價")
									div(class="form-group col-md-6")
										label(for="price") 售價
										input(type="number" class="form-control" id="price" v-model='tempProduct.price' placeholder="請輸入售價")
								hr

								div(class="form-group")
									label(for="description") 產品描述
									textarea(type="text" class="form-control" id="description"  v-model='tempProduct.description' placeholder="請輸入產品描述")
								div(class="form-group")
									label(for="content") 說明內容
									textarea(type="text" class="form-control" id="content"  v-model='tempProduct.content' placeholder="請輸入產品說明內容")
								div(class="form-group")
									div(class="form-check")
										input(class="form-check-input" type="checkbox" id="is_enabled" v-model='tempProduct.is_enabled' :true:value='1' :false-value='0')
										label(class="form-check-label" for="is_enabled") 是否啟用
						div(class="modal-footer")
							button(type="button" class="btn btn-outline-secondary" data-dismiss="modal") 取消
							button(type="button" class="btn btn-primary" @click='updateProduct()') 確認
		<!-- Modal -->
		div(class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true")
			div(class="modal-dialog" role="document")
				div(class="modal-content border-0")
					div(class="modal-header bg-danger text-white")
						h5(class="modal-title" id="exampleModalLabel")
							span 刪除產品
						button(type="button" class="close" data-dismiss="modal" aria-label="Close")
							span(aria-hidden="true")
					div(class="modal-body")
						span 是否刪除
						strong(class="text-danger") {{tempProduct.title}} 商品(刪除後將無法恢復)。
					div(class="modal-footer")
						button(type="button" class="btn btn-outline-secondary" data-dismiss="modal") 取消
						button(type="button" class="btn btn-danger" @click="deleteProduct()") 確認刪除
</template>	

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import Pagination from '@/components/admin/pageNavigation'
export default {
	data() {
		return {
			page: 0,
			isNew: '',
			products: [],
			tempProduct: {},
			pagination: {}
		}
	},
	created() {
		this.getProducts()
	},
	computed: {
		...mapGetters([
			'GET_PRODUCTDATACLAS'
		]),
	},
	methods: {
		getProducts(page = 1) {
			this.page = page
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`
			this.$http.get(api).then((response) => {
				this.products = response.data.products
				this.pagination = response.data.pagination
				console.log(response.data.products)
			})
		},
		updateProduct() {
			let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
			let httpMethod = 'post'

			if(!this.isNew) {	// 修改
				api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`
				httpMethod = 'put'
			} 

			this.$http[httpMethod](api, {data: this.tempProduct}).then((response) => {
				if(response.data.success) {
					$('#productModal').modal('hide')
					this.getProducts()
				} else {
					alert('新增失敗')
				}
			})
		},
		deleteProduct() {
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`
			this.$http.delete(api).then((response) => {
					$('#delProductModal').modal('hide')
					this.getProducts()
			})
		},
		uploadFile() {
			const uploadedFile = this.$refs.files.files[0]
			const formData = new FormData()
			formData.append('file-to-upload', uploadedFile)
			
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
			this.$http.post(api, formData, {
				headers: {'Content-Type': 'multipart/form-data'}
			}).then((response) => {
				if(response.data.success) {
					this.tempProduct.imageUrl = response.data.imageUrl
					this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl)
				}
			})
		},
		openModal(isNew, item) {
			$('#productModal').modal('show')
			if(isNew) {
				this.tempProduct = {}
				this.isNew = true
			} else {
				this.tempProduct = Object.assign({}, item)
				this.isNew = false
			}
		},
		openDelModal(item) {
			$('#delProductModal').modal('show')
			this.tempProduct = Object.assign({}, item)
		}
	},
	components: {
        Pagination,
    }
}
</script>
