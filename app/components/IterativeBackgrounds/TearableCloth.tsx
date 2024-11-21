"use client";
import React, { useEffect, useRef, useState } from "react";

interface Constraint {
  p1: Point;
  p2: Point;
  length: number;

  resolve: () => void;
}

interface Point {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  pinX: number | null;
  pinY: number | null;
  constraints: Constraint[];

  update: (delta: number) => void;
  resolveConstraints: () => void;
  attach: (point: Point) => void;
  addForce: (x: number, y: number) => void;
  pin: (pinx: number, piny: number) => void;
}

interface ClothType {
  points: Point[];
  update: () => void;
  draw: () => void;
}
interface clothWidthType {
  width: number;
}

export const ClothSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const clothWidthRef = useRef<clothWidthType | null>({ width: 100 });
  const [clothWidth, setClothWidth] = useState(0);
  const clothRef = useRef<ClothType | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clothSettings = {
      physicsAccuracy: 3,
      mouseInfluence: 30,
      mouseCut: 15,
      gravity: 1200,
      clothHeight: 60,
      // clothWidth: 55,
      startY: 10,
      spacing: 12,
      tearDistance: 60,
    };

    const {
      physicsAccuracy,
      clothHeight,
      // clothWidth,
      spacing,
      startY,
      tearDistance,
      gravity,
      mouseInfluence,
      mouseCut,
    } = clothSettings;

    let boundsX: number, boundsY: number;
    let mouseX = 0,
      mouseY = 0;
    let mouseDown = false;
    let mouseButton = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // console.log("resizeCanvas window.innerWidth", window.innerWidth / 14);
      // clothSettings.clothWidth = window.innerWidth / 14;
      boundsX = canvas.width - 1;
      boundsY = canvas.height - 1;
      setClothWidth(Math.floor(window.innerWidth / 14));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Point {
      px: number;
      py: number;
      vx: number;
      vy: number;
      pinX: number | null;
      pinY: number | null;
      constraints: Constraint[];

      constructor(
        public x: number,
        public y: number
      ) {
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
        this.pinX = null;
        this.pinY = null;
        this.constraints = [];
      }

      update(delta: number) {
        if (mouseDown) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // console.log(
          //   `Interaction: dist=${dist}, mouseInfluence=${mouseInfluence}, button=${mouseButton}`
          // );

          if (mouseButton === 0 && dist < mouseInfluence) {
            // Pull effect
            // const pullFactor = 1 - dist / mouseInfluence;
            const pullFactor = 1;

            this.px = this.x - (mouseX - this.x) * 0.5;
            this.py = this.y - (mouseY - this.y) * 0.5;
            // this.px = this.x - (mouseX - this.x) * 2 * pullFactor;
            // this.py = this.y - (mouseY - this.y) * 2 * pullFactor;
          } else if (mouseButton === 2 && dist < mouseCut) {
            // Tearing effect
            this.constraints = this.constraints.filter(
              (constraint) =>
                Math.sqrt(
                  (constraint.p1.x - constraint.p2.x) ** 2 +
                    (constraint.p1.y - constraint.p2.y) ** 2
                ) > tearDistance
            );
          }
        }

        this.addForce(0, gravity);
        delta *= delta;
        const nx = this.x + (this.x - this.px) * 0.99 + (this.vx / 2) * delta;
        const ny = this.y + (this.y - this.py) * 0.99 + (this.vy / 2) * delta;

        this.px = this.x;
        this.py = this.y;
        this.x = nx;
        this.y = ny;
        this.vy = this.vx = 0;
      }

      resolveConstraints() {
        if (this.pinX !== null && this.pinY !== null) {
          this.x = this.pinX;
          this.y = this.pinY;
          return;
        }

        for (const constraint of this.constraints) {
          constraint.resolve();
        }

        this.x = Math.max(1, Math.min(boundsX, this.x));
        this.y = Math.max(1, Math.min(boundsY, this.y));
      }

      attach(point: Point) {
        this.constraints.push(new Constraint(this, point));
      }

      addForce(x: number, y: number) {
        this.vx += x;
        this.vy += y;
      }

      pin(pinx: number, piny: number) {
        this.pinX = pinx;
        this.pinY = piny;
      }
    }

    class Constraint {
      length: number;

      constructor(
        public p1: Point,
        public p2: Point
      ) {
        this.length = spacing;
      }

      resolve() {
        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > tearDistance) {
          this.p1.constraints = this.p1.constraints.filter((c) => c !== this);
          this.p2.constraints = this.p2.constraints.filter((c) => c !== this);
          return;
        }

        const diff = (this.length - dist) / dist;
        const px = dx * diff * 0.5;
        const py = dy * diff * 0.5;

        this.p1.x += px;
        this.p1.y += py;
        this.p2.x -= px;
        this.p2.y -= py;
      }
    }

    class Cloth {
      points: Point[] = [];

      constructor() {
        if (!canvas) return;

        const startX = canvas.width / 2 - (clothWidth * spacing) / 2;

        for (let y = 0; y <= clothHeight; y++) {
          for (let x = 0; x <= clothWidth; x++) {
            const p = new Point(startX + x * spacing, startY + y * spacing);

            if (x !== 0) p.attach(this.points[this.points.length - 1]);
            if (y === 0) p.pin(p.x, p.y);
            if (y !== 0) p.attach(this.points[x + (y - 1) * (clothWidth + 1)]);

            this.points.push(p);
          }
        }
      }

      update() {
        for (let i = 0; i < physicsAccuracy; i++) {
          this.points.forEach((p) => p.resolveConstraints());
        }
        this.points.forEach((p) => p.update(0.016));
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = "#888";
        this.points.forEach((p) => {
          p.constraints.forEach((c) => {
            ctx.moveTo(c.p1.x, c.p1.y);
            ctx.lineTo(c.p2.x, c.p2.y);
          });
        });
        ctx.stroke();
      }
    }
    let cloth = null;
    if (clothWidth > 0) {
      cloth = new Cloth();
      clothRef.current = cloth;
    }
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseDown = true;
      mouseButton = e.button;
      // console.log("Mouse Down", { mouseX, mouseY, button: mouseButton });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseUp = () => {
      mouseDown = false;
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!cloth) return;
      cloth.update();
      cloth.draw();
      requestAnimationFrame(update);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", handleContextMenu);

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [clothWidth]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-screen fixed top-0 left-0 bg-transparent -z-20 pointer-events-auto"
      style={{ pointerEvents: "auto" }}
    />
  );
};
