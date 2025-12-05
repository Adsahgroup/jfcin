/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useState } from 'react';
import { X, PlayCircle, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Gallery = () => {
  const { gallery } = useApp();
  const [selectedItem, setSelectedItem] = useState<typeof gallery[0] | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 animate-fade-in">
       <div className="container mx-auto px-4 py-12">
         <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Media Gallery</h1>
         <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
           A visual journey through our events, farms, and impact stories across Nigeria.
         </p>

         <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
           {gallery.map((item) => (
             <div 
               key={item.id} 
               className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-white"
               onClick={() => setSelectedItem(item)}
             >
               <img 
                 src={item.thumbnail || item.url} 
                 alt={item.caption} 
                 className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    {item.type === 'video' ? <PlayCircle size={48} className="mx-auto mb-2" /> : <ImageIcon size={48} className="mx-auto mb-2" />}
                    <p className="font-medium">{item.caption}</p>
                  </div>
               </div>
             </div>
           ))}
         </div>
       </div>

       {/* Lightbox Modal */}
       {selectedItem && (
         <div 
           className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
           onClick={() => setSelectedItem(null)}
         >
           <button 
             className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
             onClick={() => setSelectedItem(null)}
           >
             <X size={40} />
           </button>
           
           <div className="max-w-5xl w-full max-h-screen" onClick={e => e.stopPropagation()}>
             {selectedItem.type === 'image' ? (
               <img 
                 src={selectedItem.url} 
                 alt={selectedItem.caption} 
                 className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
               />
             ) : (
                <div className="aspect-video bg-black w-full flex items-center justify-center rounded-lg border border-gray-700">
                  {/* Mock Video Player */}
                  <p className="text-white">Video Player Placeholder for {selectedItem.url}</p>
                </div>
             )}
             <p className="text-white text-center mt-4 text-lg font-medium">{selectedItem.caption}</p>
           </div>
         </div>
       )}
    </div>
  );
};

export default Gallery;