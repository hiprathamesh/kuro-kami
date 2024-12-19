<script lang="ts">
	import { cn } from '../../../utils/cn';
	import { onMount, onDestroy } from 'svelte';

	export let gradientBackgroundStart: string | null = 'rgb(28,28,28)';
	export let gradientBackgroundEnd: string | null = 'rgb(28,28,28)';
	export let firstColor: string | null = '18, 113, 255';
	export let secondColor: string | null = '180,130,64';
	export let thirdColor: string | null = '100, 220, 255';
	export let fourthColor: string | null = '200, 50, 50';
	export let fifthColor: string | null = '180, 180, 50';
	export let pointerColor: string | null = '140, 100, 255';
	export let size: string | null = '225%';
	export let blendingValue: string | null = 'soft-light';
	export let className: string | undefined = undefined;
	export let interactive: boolean | undefined = false;
	export let containerClassName: string | undefined = undefined;

	const colorSets = [
		//{ second: '255,210,45' },
		{ second: '76, 134, 255'},
		//{ second: '200, 50, 50'},
		//{ second: '220, 74, 255'}
	];

	let currentColorSetIndex = 0;
	let colorTransitionProgress = 0;
	let colorTransitionInterval: number;

	$: currentColorSet = colorSets[currentColorSetIndex];
	$: nextColorSet = colorSets[(currentColorSetIndex + 1) % colorSets.length];

	function interpolateColor(start: string, end: string, progress: number): string {
		const startParts = start.split(',').map(Number);
		const endParts = end.split(',').map(Number);
		
		const interpolatedColor = startParts.map((startVal, index) => 
			Math.round(startVal + (endParts[index] - startVal) * progress)
		).join(', ');
		
		return interpolatedColor;
	}

	function updateColors() {
		const second = interpolateColor(currentColorSet.second, nextColorSet.second, colorTransitionProgress);

		// Update CSS variables
		document.body.style.setProperty('--second-color', second);

		// Increment transition progress
		colorTransitionProgress += 0.01;

		// When transition is complete, move to next color set
		if (colorTransitionProgress >= 1) {
			colorTransitionProgress = 0;
			currentColorSetIndex = (currentColorSetIndex + 1) % colorSets.length;
		}
	}

	let interactiveRef: HTMLDivElement;

	let curX = 0;
	let curY = 0;
	let tgX = 0;
	let tgY = 0;

	$: tgX || tgY, updateGradient();

	onMount(() => {
		document.body.style.setProperty('--gradient-background-start', gradientBackgroundStart);
		document.body.style.setProperty('--gradient-background-end', gradientBackgroundEnd);
		document.body.style.setProperty('--first-color', firstColor);
		document.body.style.setProperty('--second-color', secondColor);
		document.body.style.setProperty('--third-color', thirdColor);
		document.body.style.setProperty('--fourth-color', fourthColor);
		document.body.style.setProperty('--fifth-color', fifthColor);
		document.body.style.setProperty('--pointer-color', pointerColor);
		document.body.style.setProperty('--size', size);
		document.body.style.setProperty('--blending-value', blendingValue);

		colorTransitionInterval = setInterval(updateColors, 100) as unknown as number;
	});

	onDestroy(() => {
		// Clear interval to prevent memory leaks
		if (colorTransitionInterval) {
			clearInterval(colorTransitionInterval);
		}
	});

	function updateGradient() {
		if (!interactiveRef) {
			return;
		}
		curX = curX + (tgX - curX) / 20;
		curY = curY + (tgY - curY) / 20;
		interactiveRef.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
	}

	const handleMouseMove = (event: MouseEvent) => {
		if (interactiveRef) {
			const rect = interactiveRef.getBoundingClientRect();
			tgX = event.clientX - rect.left;
			tgY = event.clientY - rect.top;
		}
	};
</script>

<div
	class={cn(
		'fixed left-0 top-0 h-[100vh] w-[100vw] overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
		containerClassName
	)}
>
	<svg class="hidden">
		<defs>
			<filter id="blurMe">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
					result="goo"
				/>
				<feBlend in="SourceGraphic" in2="goo" />
			</filter>
		</defs>
	</svg>
	<div class={cn('', className)}><slot /></div>
	<div class="gradients-container h-full w-full [filter:url(#blurMe)_blur(40px)]">
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:center_center]`,
				`opacity-100`
			)}
		></div>
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[20%] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:100%]`,
				 `animate-firsty`,
				`opacity-100`
			)}
		></div>
		<!-- <div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:calc(50%+400px)]`,
				`opacity-100`
			)}
		></div>
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:calc(50%-200px)]`,
				`opacity-70`
			)}
		></div>
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
				`opacity-100`
			)}
		></div> -->

		{#if interactive}
			<div
				bind:this={interactiveRef}
				on:mousemove={handleMouseMove}
				role="presentation"
				class={cn(
					`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
					`-left-1/2 -top-1/2 h-full w-full [mix-blend-mode:var(--blending-value)]`,
					`opacity-70`
				)}
			></div>
		{/if}
	</div>
</div>