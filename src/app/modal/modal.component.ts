import { Component, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
 
import { ModalService } from './modal.service';
 
@Component({
    selector: 'og-modal',
    templateUrl: './modal.component.html',
    host: {
      '[style.display]': "'none'"
    },
    styleUrls: ['./modal.component.scss']
    
})
 
export class ModalComponent implements OnInit, OnDestroy {
    @Input() header: string;
    showClose:boolean = true;

    @Input() id: string;
    element: any;

    @Output('close')
    closeEmitter: EventEmitter<any> = new EventEmitter();
 
    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;

        if (this.element.hasAttribute('no-x')) {
          this.showClose = false;
        }
    }
 
    ngOnInit(): void {
        let modal = this;
 
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
 
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);
 
        let shouldClose = this.showClose;
        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'og-modal' && shouldClose) {
                modal.close();
            }
        });
 
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }
 
    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }
 
    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('og-modal-open');
    }
 
    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('og-modal-open');
        this.closeEmitter.emit(true);
    }
}