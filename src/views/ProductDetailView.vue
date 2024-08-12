<template>
  <div>
    <!-- Conditionally render the correct detail component based on the route -->
    <component :is="componentName" />
  </div>
</template>

<script>
import ProductKidDetail from '../components/ProductKidDetail.vue';
import ProductMomDetail from '../components/ProductMomDetail.vue';

export default {
  name: 'ProductDetailView',
  components: {
    ProductKidDetail,
    ProductMomDetail
  },
  computed: {
    componentName() {
      // Determine the correct component to load based on the current route
      const isMomProduct = this.$route.path.includes('/product/mom/');
      return isMomProduct ? 'ProductMomDetail' : 'ProductKidDetail';
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
