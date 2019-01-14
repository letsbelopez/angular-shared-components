import {
  Directive,
  OnDestroy,
  Input,
  HostListener,
  ElementRef,
  ComponentRef,
  Renderer2,
  Injector,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
  ReflectiveInjector
} from '@angular/core';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';

@Directive({ selector: '[dloTooltip]' })
export class TooltipDirective implements OnDestroy {
  // Tooltip can be a string or component
  @Input('dloTooltip') content: string | Type<any>;
  @Input('dloTooltipPosition') position: string;

  private componentRef: ComponentRef<TooltipComponent>;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // show tooltip
    this.showTooltip();
  }

  @HostListener('mouseout')
  mouseout(): void {
    // hide tooltip
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

  generateNgContent(): any[][] {
    if (typeof this.content === 'string') {
      const element = this.renderer.createText(this.content);
      return [[element]];
    }

    // Else it's a component
    const factory = this.resolver.resolveComponentFactory(this.content);
    const componentRef = factory.create(this.injector);
    return [[componentRef.location.nativeElement]];
  }

  showTooltip() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipConfig',
        useValue: { host: this.element.nativeElement, position: this.position }
      }
    ]);
    this.componentRef = this.vcr.createComponent(
      factory,
      0,
      injector,
      this.generateNgContent()
    );
  }
}
