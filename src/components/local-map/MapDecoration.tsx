
import React from 'react';

const MapDecoration: React.FC = () => {
  return (
    <>
      {/* Parchment texture and grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundSize: '20px 20px, 20px 20px, 100px 100px',
        opacity: 0.5
      }}></div>
      
      {/* Decorative compass rose */}
      <div className="absolute top-4 right-4 w-24 h-24 opacity-60" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23c8b372' stroke-width='2'/%3E%3Cpath d='M50 5 L53 50 L50 95 M5 50 L50 47 L95 50' stroke='%23c8b372' stroke-width='2'/%3E%3Cpath d='M50 5 L50 95 M5 50 L95 50' stroke='%23c8b372' stroke-width='1'/%3E%3Cpath d='M15 15 L85 85 M15 85 L85 15' stroke='%23c8b372' stroke-width='1' stroke-dasharray='2,2'/%3E%3Ctext x='50' y='15' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3EN%3C/text%3E%3Ctext x='85' y='50' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3EE%3C/text%3E%3Ctext x='50' y='90' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3ES%3C/text%3E%3Ctext x='15' y='50' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3EW%3C/text%3E%3C/svg%3E")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }}></div>
      
      {/* Decorative medieval border frame */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-8" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpath d='M0,20 L0,10 C10,15 20,0 30,10 C40,20 50,5 60,10 C70,15 80,0 90,10 L100,10 L100,20 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 8px',
          backgroundRepeat: 'repeat-x'
        }}></div>
        <div className="absolute inset-x-0 bottom-0 h-8" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpath d='M0,0 L0,10 C10,5 20,20 30,10 C40,0 50,15 60,10 C70,5 80,20 90,10 L100,10 L100,0 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 8px',
          backgroundRepeat: 'repeat-x'
        }}></div>
        <div className="absolute inset-y-0 left-0 w-8" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 100'%3E%3Cpath d='M20,0 L10,0 C15,10 0,20 10,30 C20,40 5,50 10,60 C15,70 0,80 10,90 L10,100 L20,100 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '8px 100px',
          backgroundRepeat: 'repeat-y'
        }}></div>
        <div className="absolute inset-y-0 right-0 w-8" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 100'%3E%3Cpath d='M0,0 L10,0 C5,10 20,20 10,30 C0,40 15,50 10,60 C5,70 20,80 10,90 L10,100 L0,100 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '8px 100px',
          backgroundRepeat: 'repeat-y'
        }}></div>
      </div>
    </>
  );
};

export default MapDecoration;
