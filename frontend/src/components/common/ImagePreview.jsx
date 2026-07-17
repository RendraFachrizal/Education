import { X } from 'lucide-react';

export default function ImagePreview({ src, alt = '', onRemove, size = 80 }) {
  if (!src) return null;

  const imgSrc = src.startsWith('http') || src.startsWith('blob:') ? src : `${import.meta.env.VITE_API_URL || ''}${src}`;

  return (
    <div className="image-preview" style={{ position: 'relative', width: size, height: size, borderRadius: 8, overflow: 'hidden', border: '1px solid #E5E7EB', flexShrink: 0 }}>
      <img src={imgSrc} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {onRemove && (
        <button onClick={onRemove} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <X size={12} />
        </button>
      )}
    </div>
  );
}
