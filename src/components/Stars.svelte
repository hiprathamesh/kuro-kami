<script lang="ts">
	import { onMount } from 'svelte';

	interface Vector {
		x: number;
		y: number;
	}

	interface StarOptions {
		x: number;
		y: number;
		radius: number;
		angle: number;
		length: number;
	}

	class Star {
		x: number;
		y: number;
		radius: number;
		angle: number;
		length: number;
		vector: Vector;

		constructor({ x, y, radius, angle, length }: StarOptions) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.angle = angle;
			this.length = length;
			this.vector = {
				x: Math.cos(angle) * length,
				y: Math.sin(angle) * length
			};
		}

		draw(ctx: CanvasRenderingContext2D): void {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
			ctx.strokeStyle = 'rgba(0,0,0,0)';
			ctx.fill();
			ctx.stroke();
		}

		update(vector: Vector, width: number, height: number): void {
			this.x += vector.x + this.vector.x;
			this.y += vector.y + this.vector.y;

			// Wrap around logic
			if (this.x > width + 5) this.x = -this.radius;
			if (this.x < -this.radius - 5) this.x = width;
			if (this.y > height + 5) this.y = -this.radius;
			if (this.y < -this.radius - 5) this.y = height;
		}
	}

	interface Props {
		starCount?: number;
		backgroundColor?: string;
	}

	export let starCount: number = 50;
	export let backgroundColor: string = 'black';

	let canvasElement: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let stars: Star[] = [];
	let vector: Vector = { x: 0, y: 0 };
	let mouseVector: Vector = { x: 0, y: 0 };
	let resizeObserver: ResizeObserver;
	let isMouseOver: boolean = false;
	let lastInteractionTime: number = 0;
	const DECELERATION_DELAY = 50; // Start decelerating after 1 second of no interaction
	const DECELERATION_FACTOR = 0.98; // Reduce velocity by 5% each frame during deceleration

	function initStars(width: number, height: number): void {
		stars = Array.from({ length: starCount }, (_, i) => {
			const angle = Math.random() * Math.PI * 2;
			const length = (i / starCount) * Math.random() / 5;
			return new Star({
				x: Math.random() * width,
				y: Math.random() * height,
				radius: Math.max(0.75, i / starCount * 2.25),
				angle,
				length
			});
		});
	}

	function animate(timestamp: number): void {
		if (!ctx) return;

		const timeSinceLastInteraction = timestamp - lastInteractionTime;
		
		if (isMouseOver || timeSinceLastInteraction < DECELERATION_DELAY) {
			// Normal movement when mouse is over or recently left
			vector.x += (mouseVector.x - vector.x) / 30;
			vector.y += (mouseVector.y - vector.y) / 30;
		} else {
			// Apply deceleration
			vector.x *= DECELERATION_FACTOR;
			vector.y *= DECELERATION_FACTOR;

			// Stop completely if movement is very small
			if (Math.abs(vector.x) < 0.01) vector.x = 0;
			if (Math.abs(vector.y) < 0.01) vector.y = 0;
		}

		// Clear canvas with background color
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Update and draw stars
		stars.forEach(star => {
			star.update(
				{
					x: vector.x / 10,
					y: vector.y / 10
				},
				ctx.canvas.width,
				ctx.canvas.height
			);
			star.draw(ctx);
		});

		requestAnimationFrame(animate);
	}

	function handleMouseMove(event: MouseEvent): void {
		if (!canvasElement) return;

		const rect = canvasElement.getBoundingClientRect();
		mouseVector = {
			x: event.clientX - rect.left - rect.width / 2,
			y: event.clientY - rect.top - rect.height / 2
		};
		lastInteractionTime = performance.now();
	}

	function handleMouseEnter(): void {
		isMouseOver = true;
		lastInteractionTime = performance.now();
	}

	function handleMouseLeave(): void {
		isMouseOver = false;
		lastInteractionTime = performance.now();
	}

	function resizeCanvas(): void {
		if (!canvasElement) return;

		// Update canvas dimensions to match parent div
		canvasElement.width = canvasElement.parentElement?.clientWidth || window.innerWidth;
		canvasElement.height = canvasElement.parentElement?.clientHeight || window.innerHeight;
		initStars(canvasElement.width, canvasElement.height);
	}

	onMount(() => {
		ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;

		// Observe size changes on the parent element
		resizeObserver = new ResizeObserver(() => {
			resizeCanvas();
		});
		resizeObserver.observe(canvasElement.parentElement as HTMLElement);

		// Start animation
		requestAnimationFrame(animate);

		return () => {
			resizeObserver.disconnect();
		};
	});
</script>

<canvas
	bind:this={canvasElement}
	on:mousemove={handleMouseMove}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
></canvas>

<style>
	canvas {
		z-index: -1;
	}
</style>