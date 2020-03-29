import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  public scripts: Array<string> = new Array();

  constructor() { }

  ngOnInit() {
    this.scripts.push("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js");
    this.scripts.push("../../assets/bootstrap-3.3.7/bootstrap-3.3.7-dist/js/bootstrap.min.js");
    this.scripts.push("../../assets/js/plugins/owl-carousel/owl.carousel.min.js");
    this.scripts.push("../../assets/js/plugins/bootsnav_files/js/bootsnav.js");
    this.scripts.push("../../assets/js/plugins/typed.js-master/typed.js-master/dist/typed.min.js");
    this.scripts.push("../../assets/js/plugins/Magnific-Popup-master/Magnific-Popup-master/dist/jquery.magnific-popup.js");
    this.scripts.push("../../assets/js/plugins/particles.js-master/particles.js-master/particles.min.js");
    this.scripts.push("../../assets/js/particales-script.js");
    this.scripts.push("../../assets/js/main.js");
    
    this.loadScript();
  }

  async loadScript() {

    for (let x of this.scripts) {
      let node = document.createElement('script');
      node.src = x;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementById('scriptsTemp').appendChild(node);
      await sleep(5);
    }

  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}