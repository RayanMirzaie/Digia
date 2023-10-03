import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('artCanvas', { static: true }) canvasRef!: ElementRef;
  drawing = false;
  mirror = false;
  color = '#000000';
  lineWidth = 5;

  
  get ctx() {
    return this.canvasRef.nativeElement.getContext('2d');
  }

  ngAfterViewInit() {
    this.canvasRef.nativeElement.addEventListener('mousedown', () => this.onMouseDown());
    this.canvasRef.nativeElement.addEventListener('mouseup', () => this.onMouseUp());
    this.canvasRef.nativeElement.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));
  }

  toggleMirror() {
    this.mirror = !this.mirror;
  }

  onMouseDown() {
    this.drawing = true;
  }

  onMouseUp() {
    this.drawing = false;
    this.ctx.beginPath();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.drawing) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.ctx.lineWidth = this.lineWidth;  // Set the line width
    this.ctx.strokeStyle = this.color;
    this.ctx.lineCap = 'round';

    if (this.mirror) {
        const mirrorX = this.canvasRef.nativeElement.width - x;
        
        // Draw line to mirrored X position
        this.ctx.lineTo(mirrorX, y);
        this.ctx.stroke();

        // Reset path for next stroke
        this.ctx.beginPath();
        this.ctx.moveTo(mirrorX, y);
    }

    // Draw line to current position
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    // Reset path for next stroke
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
}


  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }
  
  
}
