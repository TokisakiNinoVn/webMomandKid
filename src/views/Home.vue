<template>
  <div class="home-container">
    <div class="banner">
      <img class="banner-image" src="/images/banner/slider1.png" alt="banner">
      <img class="banner-image" src="/images/banner/slider_2.png" alt="banner">
      <div class="next-banner">
        <ion-icon name="chevron-back-outline" class="banner-icon prev-icon"></ion-icon>
        <ion-icon name="chevron-forward-outline" class="banner-icon next-icon"></ion-icon>
      </div>
    </div>

    <h1 class="section-title">Các sản phẩm cho bé</h1>
    <ProductKidList />
    <h1 class="section-title">Các sản phẩm của mẹ</h1>
    <ProductMomList />

    <!-- Scroll to Top Button -->
    <button v-if="showScrollButton" class="scroll-to-top" @click="scrollToTop">
      <ion-icon name="arrow-up-outline"></ion-icon>
    </button>
  </div>
</template>


<script>
import ProductKidList from '@/components/ProductKidList.vue';
import ProductMomList from '@/components/ProductMomList.vue';
import bannerSlider from '@/js/bannerSlider.js';

export default {
  name: 'AppHome',
  components: {
    ProductKidList,
    ProductMomList
  },
  data() {
    return {
      showScrollButton: false
    };
  },
  mounted() {
    this.importScripts();
    bannerSlider();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    importScripts() {
      const script1 = document.createElement('script');
      script1.type = 'module';
      script1.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.nomodule = true;
      script2.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
      document.head.appendChild(script2);
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>


<style scoped>
.home-container {
  margin-top: 90px !important;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.banner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
  display: none;
  object-fit: cover;
}

.banner-image.active {
  display: block;
}

.next-banner {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
}

.banner-icon {
  font-size: 2rem;
  color: white;
  cursor: pointer;
  pointer-events: all;
}

.section-title {
  margin: 20px 0;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.scroll-to-top:hover {
  background-color: #216f99;
}

.scroll-to-top ion-icon {
  font-size: 1.5rem;
}
</style>

