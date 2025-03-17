import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas-basic',
  templateUrl: './canvas-basic.component.html',
  styleUrls: ['./canvas-basic.component.scss'],
})
export class CanvasBasicComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private startX = 0;
  private startY = 0;
  private isDrawing = false;
  private shapes: { type: 'line' | 'rectangle' | 'arrow'; x1: number; y1: number; x2: number; y2: number }[] = [];
  drawType: 'line' | 'rectangle' | 'arrow' = 'line';
  private minMoveDistance = 5; // Minimum distance to register movement

  constructor() {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');

    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'blue';
      this.ctx.lineCap = 'round';
    }
  }

  // Start drawing when mouse is pressed
  startDrawing(event: MouseEvent): void {
    if (!this.ctx) return;
    this.isDrawing = true;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
  }

  // Update preview while moving the mouse
  previewDrawing(event: MouseEvent): void {
    if (!this.ctx || !this.isDrawing) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const endX = event.clientX - rect.left;
    const endY = event.clientY - rect.top;

    // Clear only the temporary preview, NOT the entire canvas
    this.redrawCanvas();

    const distance = Math.hypot(endX - this.startX, endY - this.startY);
    if (distance < this.minMoveDistance) return; // Prevent accidental clicks from drawing arrows

    if (this.drawType === 'line') {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    } else if (this.drawType === 'rectangle') {
      const width = endX - this.startX;
      const height = endY - this.startY;
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.drawType === 'arrow') {
      this.drawArrow(this.startX, this.startY, endX, endY, this.ctx);
    }
  }

  // Stop drawing when mouse is released (final shape)
  stopDrawing(event: MouseEvent): void {
    if (!this.ctx || !this.isDrawing) return;
    this.isDrawing = false;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const endX = event.clientX - rect.left;
    const endY = event.clientY - rect.top;

    // Check if the mouse actually moved before adding the shape
    const distance = Math.hypot(endX - this.startX, endY - this.startY);
    if (distance < this.minMoveDistance) return;

    // Save the shape so it stays on the canvas
    this.shapes.push({ type: this.drawType, x1: this.startX, y1: this.startY, x2: endX, y2: endY });

    // Redraw everything to keep past shapes visible
    this.redrawCanvas();
  }

  // Redraw all stored shapes
  private redrawCanvas(): void {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.shapes.forEach(shape => {
      if (shape.type === 'line') {
        this.ctx!.beginPath();
        this.ctx!.moveTo(shape.x1, shape.y1);
        this.ctx!.lineTo(shape.x2, shape.y2);
        this.ctx!.stroke();
      } else if (shape.type === 'rectangle') {
        const width = shape.x2 - shape.x1;
        const height = shape.y2 - shape.y1;
        this.ctx!.strokeRect(shape.x1, shape.y1, width, height);
      } else if (shape.type === 'arrow') {
        this.drawArrow(shape.x1, shape.y1, shape.x2, shape.y2, this.ctx!);
      }
    });
  }

  // Draw an arrow
  private drawArrow(x1: number, y1: number, x2: number, y2: number, ctx: CanvasRenderingContext2D) {
    const headLength = 10; // Length of the arrowhead
    const angle = Math.atan2(y2 - y1, x2 - x1);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(x2, y2);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }

  // Toggle between drawing a line, rectangle, and arrow
  toggleDrawType(): void {
    if (this.drawType === 'line') {
      this.drawType = 'rectangle';
    } else if (this.drawType === 'rectangle') {
      this.drawType = 'arrow';
    } else {
      this.drawType = 'line';
    }
  }
}
