import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { TileLayer } from 'leaflet';

import { LayerControlComponent } from '../layer-control-component';

@Component({
  selector: 'n52-layer-opacity-slider',
  templateUrl: './layer-opacity-slider.component.html',
  styleUrls: ['./layer-opacity-slider.component.css']
})
export class LayerOpacitySliderComponent extends LayerControlComponent implements OnChanges {

  public opacity: number;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.layeroptions && this.layeroptions.layer instanceof TileLayer) {
      this.opacity = this.layeroptions.layer.options.opacity * 100;
    }
  }

  setOpacity(o: number) {
    this.opacity = o;
    if (this.layeroptions.layer instanceof TileLayer) {
      this.layeroptions.layer.setOpacity(this.opacity / 100);
    }
  }

}
