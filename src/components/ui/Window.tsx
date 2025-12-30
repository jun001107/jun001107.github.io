import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { WindowProps } from '@/types/app';

const Window: React.FC<WindowProps> = ({ 
  id, 
  title, 
  isOpen, 
  onClose, 
  zIndex, 
  onFocus, 
  children,
  variant = 'default'
}) => {
  const dragControls = useDragControls();
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeRaf = useRef<number>();
  const resizePointerId = useRef<number | null>(null);
  const isResizingRef = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, width: 800, height: 600 });

  // Animation variants
  const variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }
  };

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  // Keep maximized window clear of status bar and dock
  const maximizedOffsets = {
    top: 48, // px from top to sit below the status bar
    bottom: 110, // px from bottom to sit above the dock
  };

  const stopResizing = () => {
    setIsResizing(false);
    isResizingRef.current = false;
    resizePointerId.current = null;
    if (resizeRaf.current) cancelAnimationFrame(resizeRaf.current);
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', stopResizing);
    document.removeEventListener('pointercancel', stopResizing);
  };

  const handlePointerMove = (moveEvent: PointerEvent) => {
    if (!isResizingRef.current) return;
    if (resizePointerId.current === null) return;
    if (moveEvent.pointerId !== resizePointerId.current) return;
    if (moveEvent.buttons === 0) {
      stopResizing();
      return;
    }

    const newWidth = Math.max(400, resizeStart.current.width + (moveEvent.clientX - resizeStart.current.x));
    const newHeight = Math.max(300, resizeStart.current.height + (moveEvent.clientY - resizeStart.current.y));
    if (resizeRaf.current) cancelAnimationFrame(resizeRaf.current);
    resizeRaf.current = requestAnimationFrame(() => setSize({ width: newWidth, height: newHeight }));
  };

  const handleResizePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    isResizingRef.current = true;
    
    resizePointerId.current = e.pointerId;
    resizeStart.current = { x: e.clientX, y: e.clientY, width: size.width, height: size.height };

    // Keep receiving pointer events even when leaving the handle/window
    e.currentTarget.setPointerCapture(e.pointerId);

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', stopResizing);
    document.addEventListener('pointercancel', stopResizing);
  };

  const isTerminal = variant === 'terminal';
  const isMedia = variant === 'media';
  const currentSize = size;

  // Dynamic styles based on variant
  let containerClasses = 'bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl shadow-black/80'; // Default Glass
  let headerClasses = 'bg-white/5 border-b border-white/10';
  let titleColor = 'text-white/90';
  let contentPadding = 'p-6';

  if (isTerminal) {
    containerClasses = 'bg-[#0f0f11] border border-white/10 shadow-2xl shadow-black';
    headerClasses = 'bg-[#0f0f11] border-b border-transparent';
    titleColor = 'text-zinc-400';
    contentPadding = 'p-0';
  } else if (isMedia) {
    // Apple-like Light Theme
    containerClasses = 'bg-[#f5f5f7]/95 backdrop-blur-3xl border border-white/40 shadow-2xl shadow-black/30'; 
    headerClasses = 'bg-transparent border-b border-black/5';
    titleColor = 'text-black/70';
    contentPadding = 'p-0';
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={windowRef}
          drag={!isMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          initial="hidden"
          animate={isMaximized ? { 
            x: 0, 
            y: 0, 
            opacity: 1, 
            scale: 1,
            width: 'auto',
            height: 'auto',
            top: maximizedOffsets.top,
            bottom: maximizedOffsets.bottom,
            left: 0,
            right: 0
          } : "visible"}
          exit="exit"
          variants={variants}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{ 
            zIndex,
            '--window-width': `${currentSize.width}px`,
            '--window-height': `${currentSize.height}px`
          } as React.CSSProperties}
          className={`
            fixed inset-0
            ${!isMaximized ? 'sm:inset-auto sm:top-20 sm:left-[calc(50%-var(--window-width)/2)] sm:w-[var(--window-width)] sm:h-[var(--window-height)]' : ''}
          `}
          onMouseDown={onFocus}
        >
          <div className={`
            w-full h-full flex flex-col overflow-hidden relative
            ${isMaximized ? 'rounded-none' : 'rounded-none sm:rounded-xl'}
            transition-all duration-300
            ${containerClasses}
          `}>
            {/* Window Header */}
            <div 
              onPointerDown={(e) => !isMaximized && dragControls.start(e)}
              className={`
                flex items-center justify-between px-4 py-3 select-none touch-none shrink-0
                ${!isMaximized ? 'cursor-grab active:cursor-grabbing' : ''}
                ${headerClasses}
              `}
            >
              <div className="flex items-center gap-2 group">
                {/* Traffic Lights */}
                <button 
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 flex items-center justify-center transition-colors shadow-sm"
                >
                  <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 flex items-center justify-center transition-colors shadow-sm">
                  <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button 
                  className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 flex items-center justify-center transition-colors shadow-sm"
                  onClick={toggleMaximize}
                >
                  {isMaximized ? (
                    <Minimize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                  ) : (
                    <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              </div>
              
              <h3 className={`${titleColor} font-mono text-sm tracking-wide opacity-80`}>{title}</h3>
              
              <div className="w-16"></div> {/* Spacer for alignment */}
            </div>

            {/* Window Content */}
            <div className={`flex-1 overflow-y-auto ${contentPadding} ${isMedia || isTerminal ? '' : 'text-white'} custom-scrollbar cursor-auto ${isResizing ? 'pointer-events-none select-none' : ''}`}>
              {children}
            </div>

            {/* Resize Handle */}
            {!isMaximized && (
              <div 
                className="absolute bottom-0 right-0 w-6 h-6 sm:flex hidden items-end justify-end p-1 cursor-nwse-resize hover:bg-white/10 transition-colors rounded-tl-lg z-50 touch-none"
                onPointerDown={handleResizePointerDown}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 mr-1 mb-1">
                  <path d="M8 0V8H0L8 0Z" fill={isTerminal || isMedia ? "#555" : "white"}/>
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
