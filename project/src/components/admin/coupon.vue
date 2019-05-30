<template lang="pug">
	div
		div(class="text-right mt-4")
			button(class="btn btn-primary" @click="openModal(true)") 建立新產品

		table(class="table mt-4")
			thead
				tr
					th 名稱
					th 折扣數
					th 到期日
					th(class="text-right") 是否啟用
					th(class="text-right") 編輯

			tbody
				tr(v-for="(item, index) in coupons")
					td {{item.title}}
					td {{item.percent}}
					td {{item.due_date}}
					td(class="text-right")
						span(class="text-success" v-if="item.is_enabled" class="text-success") 啟用
						span(class="text-danger" v-else) 未啟用
					td(class="text-right")
						button(class="btn btn-outline-primary btn-sm" @click="openModal(false, item)") 編輯
						button(class="btn btn-outline-danger btn-sm" @click="openDelModal(item)") 刪除

		Pagination(:pagination="pagination" @getInform="getCoupons")

		<!-- Modal -->
		div(class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true")
			div(class="modal-dialog modal-lg" role="document")
				div(class="modal-content border-0")
					div(class="modal-header bg-dark text-white")
						h5(class="modal-title" id="exampleModalLabel")
							span 新增優惠券
					
						button(type="button" class="close" data-dismiss="modal" aria-label="Close")
							span(aria-hidden="true") &times;
						
						div(class="modal-body")
							div(class="row")
								div(class="w-100" style="text-align: -webkit-left;")
									div(class="form-group")
										label(for="title") 優惠券名稱
										input(type="text" class="form-control" id="title" placeholder="請輸入名稱" v-model="tempCoupons.title")
									div(class="form-row")
										div(class="form-group col-md-6")
											label(for="discount") 折扣數
											input(type="text" class="form-control" id="discount" placeholder="請輸入折扣" v-model="tempCoupons.percent")
										
									
										div(class="form-group col-md-6")
											label(for="date") 到期日
											input(type="date" class="form-control" id="date" placeholder="請輸入期限" v-model="tempCoupons.due_date")
									

									div(class="form-row")
										div(class="form-group col-md-6 w-100")
											label(for="code") 折扣代碼
											input(type="number" class="form-control" id="code" placeholder="請輸入折扣代碼" v-model="tempCoupons.code")

									hr
									div(class="form-group")
										div(class="form-check")
											input(class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupons.is_enabled" :true-value="1" :false-value="0")
											label(class="form-check-label" for="is_enabled") 是否啟用

							div(class="modal-footer")
								button(type="button" class="btn btn-outline-secondary" data-dismiss="modal") 取消
								button(type="button" class="btn btn-primary" @click='updateCoupons()') 確認

		<!-- Modal -->
		div(class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true")
			div(class="modal-dialog" role="document")
				div(class="modal-content border-0")
					div(class="modal-header bg-danger text-white")
						h5(class="modal-title" id="exampleModalLabel")
							span 刪除產品
						button(type="button" class="close" data-dismiss="modal" aria-label="Close")
							span(aria-hidden="true")
					div(class="modal-body")
						span 是否刪除
						strong(class="text-danger") {{tempCoupons.title}} 優惠券(刪除後將無法恢復)。
					div(class="modal-footer")
						button(type="button" class="btn btn-outline-secondary" data-dismiss="modal") 取消
						button(type="button" class="btn btn-danger" @click="deleteCoupons()") 確認刪除
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			coupons: [],
			tempCoupons: {
				title: "",
				is_enabled: 0,
				percent: 100,
				due_date: 0,
				code: ""
			},
			due_date: new Date(),
			isNew: false,
      		pagination: {},
		}
	},
	created() {
		this.getCoupons();
	},
	computed: {
		...mapGetters([
			'GET_PRODUCTDATACLAS'
		]),
	},
	watch: {
		due_date() {
			const timestamp = Math.floor(new Date(this.due_date) / 1000);
			this.tempCoupon.due_date = timestamp;
		}
 	 },
	methods: {
		getCoupons(page = 1) {
			this.page = page
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
			this.$http.get(api).then((response) => {
				this.coupons = response.data.coupons
				this.pagination = response.data.pagination
			})
		},
		updateCoupons() {
			let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
			let httpMethod = 'post'

			if(!this.isNew) {	// 修改
				api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.tempCoupons.id}`
				httpMethod = 'put'
			} 

			this.$http[httpMethod](api, {data: this.tempCoupons}).then((response) => {
				if(response.data.success) {
					$('#couponModal').modal('hide')
					this.getCoupons()
				} else {
					alert('新增失敗')
				}
			})
		},
		deleteCoupons() {
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.tempCoupons.id}`
			this.$http.delete(api).then((response) => {
					$('#delCouponModal').modal('hide')
					this.getCoupons()
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
			$('#couponModal').modal('show')
			if(isNew) {
				this.tempProduct = {}
				this.isNew = true
			} else {
				this.tempProduct = Object.assign({}, item)
				this.isNew = false
			}
		},
		openDelModal(item) {
			$('#delCouponModal').modal('show')
			this.tempCoupons = Object.assign({}, item)
		}
	}
}
</script>
