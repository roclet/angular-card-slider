import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import { SliderCarouselModel } from '../carousel/models/SliderCarouseModel';
@Component({
  selector: 'app-draggable-picker',
  templateUrl: './draggable-picker.component.html',
  styleUrls: ['./draggable-picker.component.scss'],
})
export class DraggablePickerComponent implements OnInit, AfterViewInit {
  @Input() slidesData: SliderCarouselModel[];
  state = {
    draggable: null,
    index: 1,
    data: [
      { title: 'Home Internet' },
      { title: 'Add a Phone-line' },
      { title: 'Home Internet' },
      { title: 'Get a device' },
      { title: 'Upgrade' },
      { title: 'Mobile Internet' },
      { title: 'Home Internet' },
      { title: 'Add a Phone-line' },
    ],
    wrapWidth: 0,
  };
  // variables declaration
  picker;
  cells;
  proxy;
  cellWidth: number = 0;

  draggable: any;
  baseTl: any;
  cellStep: number = 0;
  cells0: any;
  wrapWidth: any;
  numCells: any;
  wrapProgress: any;
  animation: any;
  x: number;
  status: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initCarouselSlider();
  }

  initCarouselSlider() {
    gsap.registerPlugin(Draggable);
    gsap.defaults({ ease: 'none' });
    this.picker = document.querySelector('.picker');
    this.cells = gsap.utils.toArray('.cell');
    this.proxy = document.createElement('div');

    this.cellWidth = 320;

    this.numCells = this.cells.length;
    this.cellStep = 1 / this.numCells;
    this.wrapWidth = this.cellWidth * this.numCells;

    this.baseTl = gsap.timeline({ paused: true });
    const baseTl11 = gsap.timeline({ paused: true });
    this.wrapProgress = gsap.utils.wrap(0, 1);

    gsap.set(this.picker, {
      //perspective: 1100,
      width: this.wrapWidth - this.cellWidth,
    });

    for (var i = 0; i < this.cells.length; i++) {
      this.initCell(this.cells[i], i);
    }
    this.animation = gsap
      .timeline({ repeat: -1, paused: true })
      .add(this.baseTl.tweenFromTo(1, 2, { immediateRender: true }));
    this.draggable = new Draggable(this.proxy, {
      // allowContextM enu: true,
      type: 'x',
      trigger: this.picker,
      inertia: true,
      onDrag: this.updateProgress,
      onThrowUpdate: this.updateProgress,
      snap: {
        x: this.snapX,
      },
      onThrowComplete: function () {
        let biggestElement = this.cells
          .slice(0)
          .sort(
            (a, b) =>
              Number(gsap.getProperty(a, 'scaleX')) -
              Number(gsap.getProperty(b, 'scaleX'))
          )
          .pop();
      },
    });
  }

  snapX(x) {
    return Math.round(x / this.cellWidth) * this.cellWidth;
  }

  updateProgress() {
    const baseTl11 = gsap.timeline({ paused: true });
    const animation1 = gsap
      .timeline({ repeat: -1, paused: true })
      .add(baseTl11.tweenFromTo(1, 2, { immediateRender: true }));
    const wrapProgress1 = gsap.utils.wrap(0, 1);
    animation1.progress(wrapProgress1(this.x / this.wrapWidth));
  }

  initCell(element, index) {
    let i = index;
    gsap.set(element, {
      width: this.cellWidth,
      scale: 0.6,
      //rotationX: rotationX,
      x: -this.cellWidth,
    });

    const tl = gsap
      .timeline({ repeat: 1 })
      .to(
        element,
        1,
        { x: '+=' + this.wrapWidth /*, rotationX: -rotationX*/ },
        0
      )
      .to(
        element,
        this.cellStep,
        { color: '#000000', height: '600px', scale: 1, repeat: 1, yoyo: true },
        0.5 - this.cellStep
      );
    this.baseTl.add(tl, i * -this.cellStep);
  }

  backSlide() {
    let i = this.state.index;
    let nextPosition = i - 0.1;
    let element = this.baseTl.tweenFromTo(i, nextPosition, {
      immediateRender: true,
      duration: 2,
    });
    let tl = gsap
      .timeline({ repeat: 100 })
      .to(element, 1, { x: '+=' + this.state.wrapWidth }, 0)
      .to(element, this.cellStep, { repeat: 100, yoyo: false }, i);
    i = i - 0.1;
    let baseTl = this.baseTl.add(tl, i);
    this.status = false;
  }

  nextSlide() {
    let i = this.state.index;
    let nextPosition = i + 0.1;
    let el = this.cells[i];
    let element = this.baseTl.tweenFromTo(i, nextPosition, {
      immediateRender: true,
      duration: 2,
    });
    let tl = gsap
      .timeline({ repeat: 100 })
      .to(element, 1, { x: '+=' + this.state.wrapWidth }, 0)
      .to(element, this.cellStep, { repeat: 100, yoyo: false }, i);
    i = i + 0.1;
    let baseTl = this.baseTl.add(tl, i);
    this.status = false;
  }
}
