<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

  export default {
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 6
      },
      pageSizes: {
        type: Array,
        default() {
          return [6, 10, 20, 30]
        }
      },
      layout: {
        type: String,
        //总条数 total 前往页数jumper
        default: 'prev, pager, next, sizes'
      },
      background: {
        type: Boolean,
        default: true
      },
      hidden: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      },
      pageSize: {
        get() {
          return this.limit
        },
        set(val) {
          this.$emit('update:limit', val)
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('pagination', { page: this.currentPage, limit: val })
      },
      handleCurrentChange(val) {
        this.$emit('pagination', { page: val, limit: this.pageSize })

      }
    }
  }
</script>

<style scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
  }
  .pagination-container.hidden {
    display: none;
  }
</style>
