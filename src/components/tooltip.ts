type TooltipParams = {
    text: string;
    position?: 'top' | 'bottom';
  };
  
  export function tooltip(node: HTMLElement, params: TooltipParams) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = params.text;
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(41, 41, 41, 0.5);
      border: 0.01px solid rgba(255, 255, 255, 0.15);
      font-weight: 500;
      color: #D0D0D0;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      transform: scale(0);
      transition: transform 0.15s ease-out;
      transform-origin: center ${params.position === 'bottom' ? 'top' : 'bottom'};
      white-space: nowrap;
      z-index: 1000;
    `;
  
    // const handleMouseEnter = () => {
    //   document.body.appendChild(tooltip);
    //   // Trigger reflow to ensure animation works
    //   void tooltip.offsetWidth;
    //   tooltip.style.transform = 'scale(1)';
    //   positionTooltip();
    // };
  
    const handleMouseLeave = () => {
      tooltip.style.transform = 'scale(0)';
      // Remove tooltip after animation completes
      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 150);
    };
  
    const positionTooltip = () => {
        const rect = node.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
      
        // Temporarily make tooltip visible but transparent to get correct dimensions
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'scale(1)';
        tooltip.style.opacity = '0';
        document.body.appendChild(tooltip);
        
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Now position it correctly
        if (params.position === 'bottom') {
          tooltip.style.top = `${rect.bottom + 10}px`;
        } else {
          tooltip.style.top = `${rect.top - 40}px`;
        }
        tooltip.style.left = `${rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2)}px`;
        
        // Make it visible again
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
      };
      
      const handleMouseEnter = () => {
        // Remove previous tooltip if exists
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
        
        // Position tooltip first
        positionTooltip();
        
        // Then animate it
        requestAnimationFrame(() => {
          tooltip.style.transform = 'scale(1)';
        });
      };
  
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
  
    return {
      update(newParams: TooltipParams) {
        tooltip.textContent = newParams.text;
      },
      destroy() {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }
    };
  }