import { Component, Input, OnInit } from '@angular/core';

import { WmsCapabilitiesService } from '../../../services/wms-capabilities.service';
import { OlLayerTimeSelectorComponent } from '../ol-layer-time-selector/ol-layer-time-selector.component';

/**
 * Legend component to animate time dependend layers, the time information is gathered by the WMS capabilities
 */
@Component({
  selector: 'n52-ol-layer-animate-time',
  templateUrl: './ol-layer-animate-time.component.html'
})
export class OlLayerAnimateTimeComponent extends OlLayerTimeSelectorComponent implements OnInit {

  /**
   * Interval of the animation
   */
  @Input() timeInterval = 2000;

  private interval: NodeJS.Timeout;

  constructor(
    protected wmsCaps: WmsCapabilitiesService
  ) {
    super(wmsCaps);
  }

  public startAnimation() {
    // get current time parameter
    this.determineCurrentTimeParameter();
    // find index in list
    let idx = this.timeDimensions.findIndex(e => e.getTime() === this.currentTime.getTime());
    // start animation
    this.interval = setInterval(() => {
      idx++;
      if (idx >= this.timeDimensions.length) { idx = 0; }
      this.setTime(this.timeDimensions[idx]);
    }, this.timeInterval);
  }

  public stopAnimation() {
    clearInterval(this.interval);
  }

  public resetAnimation() {
    this.wmsCaps.getDefaultTimeDimension(this.layerid, this.url).subscribe(time => this.setTime(time));
  }

}
