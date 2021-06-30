import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

new Vue({
    el: "#slider-component",
    template: "#slider-container",
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            reviews: [],
            sliderOptions: {
                slidesPerView: 1,
                loop: false
            }
        };
    },
    computed: {
        slider() {
            return this.$refs["slider"].$swiper;
        }
    },
    methods: {
        requireImagesToArray(data) {
            return data.map((item) => {
                item.pic = require(`../images/content/${item.pic}`).default;
                return item;
            });
        },
        slide(direction) {
            switch (direction) {
                case "next":
                    this.slider.slideNext();
                    break;
                case "prev":
                    this.slider.slidePrev();
                    break;
            }
        },
        handleResize() {
            this.sliderOptions.slidesPerView = window.innerWidth > 768 ? 2 : 1;
            console.log(this.sliderOptions.slidesPerView)
        }
    },
    created() {
        const data = require("../data/reviews.json");
        this.reviews = this.requireImagesToArray(data);

        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    }
});
