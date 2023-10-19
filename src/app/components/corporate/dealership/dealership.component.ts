import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-dealership',
  templateUrl: './dealership.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './dealership.component.css']
})
export class DealershipComponent  implements OnInit{

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | any;
  slider: KeenSliderInstance | any = null;

  public articleFirst?: Article;
  public articles?: Article | any;
  
  constructor(
    private ArticleService: ArticleService
  ){
    let id_section_About: number = 7;
    this.ArticleService.getContactArticleXSection(id_section_About).subscribe((articleData: any) =>{
      this.articleFirst = articleData.shift();
      this.articles = articleData;      
    });
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
      },
      [
        (slider) => {
          let timeout: any;
          let mouseOver = false;
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 2500)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
    )
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

}
