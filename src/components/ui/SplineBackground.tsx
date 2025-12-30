import React from 'react';

const SplineBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* 
        We increase the iframe size significantly (125%) and center it to push the 
        "Built with Spline" badge/watermark off-screen.
      */}
      <iframe 
        src='https://my.spline.design/nexbotrobotcharacterconcept-YlFJH0phpSzpwW6sximAx841/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        className="absolute w-[125%] h-[125%] -left-[12.5%] -top-[12.5%] pointer-events-auto"
        title="Spline 3D Background"
        allow="fullscreen; autoplay; encrypted-media; camera; gyroscope; accelerometer"
      />
    </div>
  );
};

export default SplineBackground;