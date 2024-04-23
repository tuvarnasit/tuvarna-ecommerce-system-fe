import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Pagination,EffectFade } from 'swiper/modules';


@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;
  public swiperIndex: number = 0;

  public HomeSliderData = [
    {
      id: 1,
      pre_title: { text: "Започващи от", price: 430 },
      title: "Нова колекция смартфони 2024",
      subtitle: {
        text_1: "Екскулузивни оферти ",
        percent: 33,
        text_2: "намеление тази седмица",
      },
      img: "/assets/img/slider/phones-slider-img-1.png",
      is_light: true,
    },
    {
      id: 2,
      pre_title: { text: "Започващи от", price: 189 },
      title: "Нова колекция смарт часовници 2024",
      subtitle: {
        text_1: "Екскулузивни оферти ",
        percent: 25,
        text_2: "намеление тази седмица",
      },
      img: "/assets/img/slider/watches-slider-img-2.png",
      is_light: true,
      green_bg: false
    },
    {
      id: 3,
      pre_title: { text: "Започващи от", price: 99 },
      title: "Кафе машини за невероятно кафе",
      subtitle: {
        text_1: "Ункални оферти ",
        percent: 40,
        text_2: "намеление тази седмица",
      },
      img: "/assets/img/slider/coffee-slider-img-3.png",
      is_light: true,
    },
  ];

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance = new Swiper('.tp-slider-active', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        effect : 'fade',
        modules:[EffectFade,Pagination],
        pagination: {
          el: ".tp-slider-dot",
          clickable: true
        },
        on: {
          slideChange: () => {
            this.swiperIndex = this.swiperInstance?.realIndex || 0;
          }
        }
      })
    }
  }
}
