// src/actions/magneticHover.ts
type MagneticHoverParams = {
  intensity?: number;
  scale?: number;
};

export function magneticHover(
  node: HTMLElement,
  params: MagneticHoverParams = {}
) {
  const intensity = params.intensity || 15;
  const scale = params.scale || 1.1;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    const xTilt = xPercent * intensity;
    const yTilt = yPercent * intensity;

    node.style.transform = `
        perspective(1000px) 
        rotateX(${-yTilt}deg) 
        rotateY(${xTilt}deg)
        translateZ(20px)
        scale(${scale})
      `;
  };

  const handleMouseLeave = () => {
    node.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
    node.style.transition = "transform 0.5s ease-out";
  };

  const handleMouseEnter = () => {
    node.style.transition = "none";
  };

  node.style.transformStyle = "preserve-3d";
  node.style.transition = "transform 0.5s ease-out";

  node.addEventListener("mousemove", handleMouseMove);
  node.addEventListener("mouseleave", handleMouseLeave);
  node.addEventListener("mouseenter", handleMouseEnter);

  return {
    destroy() {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
      node.removeEventListener("mouseenter", handleMouseEnter);
    },
  };
}
